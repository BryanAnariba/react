import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { envVariables } from 'src/core/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(envVariables.mongoUrl), 
    AuthModule, 
    UsersModule
  ],
})
export class InventoryModule { }
