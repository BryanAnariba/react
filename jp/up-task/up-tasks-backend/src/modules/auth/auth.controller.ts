import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewAccountDto } from './dto/new-account.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { ResendConfirmationTokenDto } from './dto/resend-confirmation-token.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '../users/schemas/user.schemas';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('new-account')
  public onNewAccount (@Body() newAccountDto: NewAccountDto) {
    return this.authService.newAccount(newAccountDto);
  }

  @Post('sign-in')
  public onSignIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('confirm-account')
  public onConfirmAccount(@Body() confirmAccountDto: ConfirmAccountDto) {
    return this.authService.confirmAccount(confirmAccountDto);
  }

  @Post('resend-confirmation-token')
  public onResendConfirmationToken (@Body() resendConfirmationTokenDto: ResendConfirmationTokenDto) {
    return this.authService.resendConfirmationToken(resendConfirmationTokenDto);
  }

  @Post('forgot-password')
  public onForgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }


  @Post('validate-code-reset-password')
  public onValidateAccountResetPassword(@Body() confirmAccountDto: ConfirmAccountDto) {
    return this.authService.validateToken(confirmAccountDto);
  }

  @Post('update-user-password/:token')
  public onUpdatePassword(@Param('token', ParseIntPipe) token: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePasswordWithToken(token, updatePasswordDto)
  }

  @Get('user-profile')
  @Auth()
  userProfile (@GetUser() user: User) {
    return this.authService.getUserProfile(user);
  }

}
