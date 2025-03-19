import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    example: 'Polo Shirt',
    description: 'Product Name',
    uniqueItems: true,
    minLength: 3,
  })
  @Column({ type: 'varchar', nullable: false, unique: true })
  public name: string;

  @ApiProperty({
    example: 9.99,
    description: 'Product Price',
    default: 0.00,
  })
  @Column({ type: 'decimal', default: 0, precision: 15, scale: 2})
  public price: number;

  @ApiProperty({
    example: true,
    description: 'The product is avaliable?, true if is avaliable and false if is not avaliable',
    default: true,
  })
  @Column({ type: 'boolean', default: true })
  public avaliable: boolean;

  @ApiProperty({
    example: true,
    description: 'The product is active?, true if is active and false is not active'
  })
  @Column({ type: 'boolean', default: true })
  public isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
