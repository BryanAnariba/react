import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;
  @IsNotEmpty()
  @IsString()
  public password: string;
}
