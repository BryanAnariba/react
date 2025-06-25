import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  public name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  public description: string;
}
