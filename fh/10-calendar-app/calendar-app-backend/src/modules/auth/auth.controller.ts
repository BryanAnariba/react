import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dtos';
import { AuthGuard } from './guards/auth.guard';
import { GetToken, GetUser } from './decorators';
import { User } from '../users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp (@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  signIn (@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('refresh-jwt')
  @UseGuards(AuthGuard)
  refreshJWT (
    @GetUser() user: User,
    @GetToken() token: string,
  ) {
    return { 
      user, 
      token 
    };
  }
}
