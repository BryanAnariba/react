import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  public projectName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  public clientName: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  public description: string;
}
