import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  public agent: string;

  @IsNotEmpty()
  @IsNumber()
  public desktop: number;
}
