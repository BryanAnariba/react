import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class SearchUserDto {

  @IsOptional()
  @IsString()
  public readonly email: string;

  @IsOptional()
  @IsString()
  public readonly name: string;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  public readonly limit: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  public readonly skip: number;
  
}