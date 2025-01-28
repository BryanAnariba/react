import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from 'src/common/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule, 
    EventsModule,
    MongooseModule.forRoot(envs.mongoUrl),
    UsersModule,
  ],
})
export class ModulesModule { }
