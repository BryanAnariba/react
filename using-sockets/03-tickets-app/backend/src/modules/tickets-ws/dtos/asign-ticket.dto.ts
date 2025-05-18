import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class AsignTicketDto {
  @IsNotEmpty()
  @IsString()
  public readonly agent: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public readonly no: number;
}
