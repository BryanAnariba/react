import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {

  @ApiProperty({
    example: 5,
    description: 'The quantity of records that do you want to show in the api response',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  public readonly limit: number;

  @ApiProperty({
    example: 1,
    description: 'The quantity of records that do you want to skip in the api response: limit * skip = 5 * 1 = 5',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  public readonly skip: number;
}
