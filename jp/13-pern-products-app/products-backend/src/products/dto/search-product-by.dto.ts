import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class SearchProductByDto extends PaginationDto {
  @ApiProperty({
    example: true,
    description: 'Find products by isActive field filter',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly isActive: string;

  @ApiProperty({
    example: 'Shirt',
    description: 'Find Product by name field filter',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly name: string;

  @ApiProperty({
    example: true,
    description: 'Find Products by avaliable field filter',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly avaliable: string;
}
