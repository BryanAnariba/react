import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { envVariables } from 'src/core/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: envVariables.secretKey,
      signOptions: {
        expiresIn: '1h',
      },     
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
