import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  public description: string;
}
