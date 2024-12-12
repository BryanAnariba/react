import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetUser } from '../auth/decorators';
import { User } from '../users/schemas/user.schema';

@Controller('events')
@UseGuards(AuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(
    @Body() createEventDto: CreateEventDto,
    @GetUser() user: User,
  ) {
    return this.eventsService.create(createEventDto, user);
  }

  @Get()
  findAll(
    @GetUser() user: User
  ) {
    return this.eventsService.findAll(user);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateEventDto: UpdateEventDto, 
    @GetUser() user: User
  ) {
    return this.eventsService.update(id, updateEventDto, user);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string, 
    @GetUser() user: User
  ) {
    return this.eventsService.remove(id, user);
  }
}
