import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { HttpErrorHandler } from 'src/common/handlers/http-errors.handle';
import { SearchProductByDto } from './dto/search-product-by.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      throw HttpErrorHandler(error);
    }
  }

  async findAll(searchProductByDto: SearchProductByDto): Promise<Product[]> {
    try {
      const {
        limit = 10,
        skip = 0,
        isActive = 'true',
        name,
        avaliable,
      } = searchProductByDto;
      const qb = this.productRepository
        .createQueryBuilder('product')
        .skip(limit * skip)
        .take(limit)
        .orderBy('product.id', 'DESC');
      if (isActive)
        qb.andWhere('product.isActive = :isActive', {
          isActive: isActive === 'true' ? true : false,
        });
      if (name) qb.andWhere('product.name ILIKE :name', { name: `%${name}%` });
      if (avaliable)
        qb.andWhere('product.avaliable = :avaliable', {
          avaliable: avaliable === 'true' ? true : false,
        });
      const products = await qb.getMany();
      if (products.length === 0)
        throw new HttpException('Products not found', HttpStatus.NOT_FOUND);
      return products.map((p) => ({ ...p, price: +p.price }));
    } catch (error) {
      throw HttpErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!product)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      return {
        ...product,
        price: Number(product.price),
      };
    } catch (error) {
      throw HttpErrorHandler(error);
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.productRepository.preload({ id: id });
      if (!product)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      return await this.productRepository.save({
        ...product,
        ...updateProductDto,
      });
    } catch (error) {
      throw HttpErrorHandler(error);
    }
  }

  async updateAvaliability(
    id: string,
  ): Promise<Product> {
    try {
      const product = await this.productRepository.preload({ id: id });
      if (!product)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      const updated = await this.productRepository.save({
        ...product,
        avaliable: !product.avaliable,
      });
      return {
        ...updated,
        price: Number(updated.price),
      }
    } catch (error) {
      throw HttpErrorHandler(error);
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.preload({ id: id });
      if (!product)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      const deleted = await this.productRepository.save({ ...product, isActive: false });
      return {
        ...deleted,
        price: Number(deleted.price),
      }
    } catch (error) {
      throw HttpErrorHandler(error);
    }
  }
}
