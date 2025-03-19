import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  public readonly projectName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public readonly clientName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  public readonly description: string;
}
