import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Polo Shirt',
    description: 'Product Name',
    required: true,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  public readonly name: string;

  @ApiProperty({
    example: 9.99,
    description: 'Product price',
    required: false,
    default: 0,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  public readonly price: number;

  @IsOptional()
  @IsBoolean()
  public readonly avaliable: boolean;
}
