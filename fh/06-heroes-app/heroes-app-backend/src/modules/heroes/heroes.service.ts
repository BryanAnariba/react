import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Hero } from './schemas/hero.schema';
import { Model } from 'mongoose';
import { handleErrorsExceptions } from 'src/common/exceptions';
import { Publisher } from './enums';
import { SearchHeroByDto } from './dto';

@Injectable()
export class HeroesService {

  constructor(
    @InjectModel(Hero.name)
    private readonly heroModel: Model<Hero>,
  ) { }

  async create(createHeroDto: CreateHeroDto): Promise<Hero> {
    try {
      const hero = await this.heroModel.create(createHeroDto);
      return await hero.save();
    } catch (error) {
      handleErrorsExceptions(error);
    }
  }

  async findAll(searchHeroByDto: SearchHeroByDto): Promise<Hero[]> {
    try {
      const heroes = await this.heroModel.find(searchHeroByDto);
      return heroes;
    } catch (error) {
      handleErrorsExceptions(error);
    }
  }

  async findOne(id: string): Promise<Hero> {
    try {
      const hero = await this.heroModel.findOne({ _id: id });
      if (!hero) throw new HttpException(`Hero ${id} not found`, HttpStatus.NOT_FOUND);
      return hero;
    } catch (error) {
      handleErrorsExceptions(error);
    }
  }

  async findOneByTerm(term: string): Promise<Hero[]> {
    try {
      const heroes = await this.heroModel.find({ superhero: {$regex: term, $options: 'i'} });
      if (heroes.length === 0) throw new HttpException(`Heroes ${term} not found`, HttpStatus.NOT_FOUND);
      return heroes;
    } catch (error) {
      handleErrorsExceptions(error);
    }
  }

  async update(id: string, updateHeroDto: UpdateHeroDto): Promise<Hero> {
    try {
      await this.findOne(id);
      const hero = await this.heroModel.findOneAndUpdate({ _id: id }, updateHeroDto, { new: true });
      return hero;
    } catch (error) {
      handleErrorsExceptions(error);
    }
  }

  async remove(id: string): Promise<Hero> {
    try {
      const hero = await this.findOne(id);
      await this.heroModel.deleteOne({_id: id});
      return hero;
    } catch (error) {
      handleErrorsExceptions(error);
    }
  }
}
