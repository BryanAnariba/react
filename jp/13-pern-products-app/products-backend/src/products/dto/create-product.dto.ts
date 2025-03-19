import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  
  @ApiProperty({
    example: 'Polo Shirt',
    description: 'Product Name',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public readonly name: string;

  @ApiProperty({
    example: 9.99,
    description: 'Product price',
    required: false,
    default: 0,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  public readonly price: number;
}
