import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendConfirmationTokenDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
