import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {

  @IsNotEmpty()
  @IsString()
  public readonly email;

  @IsNotEmpty()
  @IsString()
  public readonly password;

}