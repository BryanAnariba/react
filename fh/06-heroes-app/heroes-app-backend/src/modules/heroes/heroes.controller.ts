import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { IsUuidPipe } from 'src/common/pipes';
import { Publisher } from './enums';
import { CreateHeroDto, SearchHeroByDto, UpdateHeroDto } from './dto';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroesService.create(createHeroDto);
  }

  @Get('')
  findAll(@Query() searchHeroByDto: SearchHeroByDto) {
    return this.heroesService.findAll(searchHeroByDto);
  }

  @Get(':id')
  findOne(@Param('id', IsUuidPipe) id: string) {
    return this.heroesService.findOne(id);
  }

  @Get('by/superhero')
  findOneByTerm(@Query() query: {term: string}) {
    return this.heroesService.findOneByTerm(query.term);
  }

  @Patch(':id')
  update(@Param('id', IsUuidPipe) id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroesService.update(id, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id', IsUuidPipe) id: string) {
    return this.heroesService.remove(id);
  }
}
