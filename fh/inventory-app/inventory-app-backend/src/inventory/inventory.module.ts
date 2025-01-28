import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { envVariables } from './core/config';
import { CoreModule } from './core/core.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    MongooseModule.forRoot(envVariables.mongoUrl), 
    CoreModule,
    AuthModule, 
    UsersModule, RolesModule
  ],
})
export class InventoryModule { }
