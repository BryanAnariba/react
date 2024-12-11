import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {

  @IsNotEmpty()
  @IsString()
  public readonly title: string;

  @IsNotEmpty()
  @IsString()
  public readonly notes: string;

  @IsNotEmpty()
  @IsDate()
  public readonly start: Date;

  @IsNotEmpty()
  @IsDate()
  public readonly end: Date;

}
