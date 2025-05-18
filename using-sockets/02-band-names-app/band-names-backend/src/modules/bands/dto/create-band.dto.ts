import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBandDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;
}
