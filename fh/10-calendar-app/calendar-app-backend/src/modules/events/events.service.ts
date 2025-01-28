import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './schemas/event.entity';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {

  constructor (
    @InjectModel(Event.name)
    private readonly eventsModel: Model<Event>
  ) {}

  async create(createEventDto: CreateEventDto, loggedUser: User): Promise<Event> {
    try {
      const event = await this.eventsModel.create({...createEventDto, user: loggedUser._id});
      const saved = await event.save();
      return saved;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Sometie went wrong creating the event: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(user: User): Promise<Event[]> {
    try {
      // user: user._id
      return await this.eventsModel.find({isActive: true}).populate('user', 'name email');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Sometime went wrong getting users: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Event> {
    try {
      const event = await this.eventsModel.findOne({isActive: true, _id: id}).populate('user', 'name email');
      if (!event) throw new HttpException(`Event deleted or not found`, HttpStatus.BAD_REQUEST);
      return event;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Sometime went wrong getting users: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateEventDto: UpdateEventDto,  user: User): Promise<Event> {
    try {
      const event = await this.findOne(id);
      if (event.user['_id'].toString() !== user._id) throw new HttpException(`This event does not belong to you`, HttpStatus.UNAUTHORIZED);
      const updated = await this.eventsModel.findOneAndUpdate({_id: id}, { ...updateEventDto }, { new: true });
      return updated;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Sometime went wrong getting users: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string, user: User):  Promise<Event> {
    try {
      const event = await this.findOne(id);
      // console.log({user: event.user['_id'].toString(), id: user._id})
      if (event.user['_id'].toString() !== user._id) throw new HttpException(`This event does not belong to you`, HttpStatus.UNAUTHORIZED);
      const deleted = await this.eventsModel.findOneAndUpdate({_id: id}, { isActive: (event.isActive === true) ?  false : true }, { new: true });
      return deleted;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Sometime went wrong getting users: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
