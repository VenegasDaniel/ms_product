import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CheckProductDto } from './dto/check-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Post('create')
  create(@Body() createProductDto: CreateProductDto) { 
    return this.ProductsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.ProductsService.findAll();
  }

  @Get()
  findOne(@Param('id') id: string) {
    return this.ProductsService.findOne(+id);
  }

  @Post('checkProduct')
  async checkProduct(@Body() checkProductDto: CheckProductDto) {
    return await this.ProductsService.checkProduct(checkProductDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ProductsService.remove(+id);
  }
}