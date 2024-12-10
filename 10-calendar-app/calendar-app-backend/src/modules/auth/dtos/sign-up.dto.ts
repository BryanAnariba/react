import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class SignUpDto {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  public readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  public readonly password: string;
  
}