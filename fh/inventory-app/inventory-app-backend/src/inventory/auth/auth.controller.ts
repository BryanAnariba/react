import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dtos';
import { AuthGuard } from './guards/auth.guard';
import { GetToken, GetUser } from './decorators';
import { LoggedUser } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn (@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Get('validate-jwt')
  @UseGuards(AuthGuard)
  validateJwt (
    @GetUser() user: LoggedUser,
    @GetToken() token: string,
  ) {
    return {
      user: user,
      token: token,
    }
  }
}
