import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateRoleDto {

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  public readonly description: string;
  
}
