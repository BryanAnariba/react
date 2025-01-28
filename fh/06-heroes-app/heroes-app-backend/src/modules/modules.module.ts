import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { environmentVars } from 'src/common/config';
import { HeroesModule } from './heroes/heroes.module';

@Module({
  imports: [MongooseModule.forRoot(environmentVars.mongoUri), HeroesModule]
})
export class ModulesModule { }
