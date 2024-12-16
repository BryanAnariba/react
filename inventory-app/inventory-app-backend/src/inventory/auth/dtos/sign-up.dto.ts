import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class SignUpDto {
  
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public readonly name;
  
  @IsNotEmpty()
  @IsEmail()
  public readonly email;
  
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  public readonly password;

}