import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductByDto } from './dto/search-product-by.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({
    status: 201,
    description: 'Product created',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description:
      'Sometime went wrong creating the product, for example. record duplicated',
  })
  @ApiResponse({
    status: 500,
    description: 'Sometime went wrong creating the product',
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Return all products searching by filters',
    example: [
      {
        id: '3e50408f-c340-4833-a51d-ea7bfff534a1',
        name: 'Polo Shirt',
        price: 9.99,
        avaliable: true,
        isActive: true,
        createdAt: '2025-03-13 02:53:35.400',
        updatedAt: '2025-03-13 02:53:35.400',
      },
      {
        id: '3e50408f-c340-4833-a51d-ea7bfff534a1',
        name: 'Polo Shirt',
        price: 9.99,
        avaliable: true,
        isActive: true,
        createdAt: '2025-03-13 02:53:35.400',
        updatedAt: '2025-03-13 02:53:35.400',
      },
    ],
  })
  @ApiResponse({
    status: 404,
    description: 'Products not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Sometime went wrong creating the product',
  })
  @Get()
  findAll(@Query() searchProductByDto: SearchProductByDto) {
    return this.productsService.findAll(searchProductByDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Product found',
    example: {
      id: '3e50408f-c340-4833-a51d-ea7bfff534a1',
      name: 'Polo Shirt',
      price: 9.99,
      avaliable: true,
      isActive: true,
      createdAt: '2025-03-13 02:53:35.400',
      updatedAt: '2025-03-13 02:53:35.400',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Sometime went wrong creating the product',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Product updated',
    example: {
      id: '3e50408f-c340-4833-a51d-ea7bfff534a1',
      name: 'Polo Shirt',
      price: 9.99,
      avaliable: true,
      isActive: true,
      createdAt: '2025-03-13 02:53:35.400',
      updatedAt: '2025-03-13 02:53:35.400',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Product was not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Sometime went wrong updating the product.'
  })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Product updated',
    example: {
      id: '3e50408f-c340-4833-a51d-ea7bfff534a1',
      name: 'Polo Shirt',
      price: 9.99,
      avaliable: false,
      isActive: true,
      createdAt: '2025-03-13 02:53:35.400',
      updatedAt: '2025-03-13 02:53:35.400',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Product was not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Sometime went wrong updating the product.'
  })
  @Patch(':id/avaliability')
  updateAvaliability(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.productsService.updateAvaliability(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Product deleted',
    example: {
      id: '3e50408f-c340-4833-a51d-ea7bfff534a1',
      name: 'Polo Shirt',
      price: 9.99,
      avaliable: true,
      isActive: false,
      createdAt: '2025-03-13 02:53:35.400',
      updatedAt: '2025-03-13 02:53:35.400',
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Sometime went wrong creating the product',
  })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
