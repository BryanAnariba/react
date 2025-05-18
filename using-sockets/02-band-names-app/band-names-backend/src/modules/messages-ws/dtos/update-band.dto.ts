import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBanDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  name: string;
}
