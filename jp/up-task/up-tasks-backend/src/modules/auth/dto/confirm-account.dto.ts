import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmAccountDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
