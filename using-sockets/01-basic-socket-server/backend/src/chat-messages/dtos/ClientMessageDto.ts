import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ClientMessageDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  public readonly message: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  public readonly name: string;
}
