import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ChangeProductDto } from './dto/change-product.dto';
import { CheckProductDto } from './dto/check-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Post('create')
  create(@Body() createProductDto: CreateProductDto) { 
    return this.ProductsService.create(createProductDto);
  }


  @Get('findAll')
  async findAll() {
    return this.ProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ProductsService.findOne(+id);
  }

  @Post('checkProduct')
  async checkProduct(@Body() checkProductDto: CheckProductDto) {
    return await this.ProductsService.checkProduct(checkProductDto)
  }

  @Patch('updateState')
  async updateState(@Body() changeProductDto: ChangeProductDto): Promise<boolean | string>  {
    try {
      const result = await this.ProductsService.updateState(changeProductDto);  
      if (result === true) {
        return true; 
      } else if (result === false) {
        console.log('No Product found with the provided id')
      } else {
        console.log('Error updating Product state');
      }
    } catch (error) {
      throw new error(error.message);
    }
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ProductsService.remove(+id);
  }
}