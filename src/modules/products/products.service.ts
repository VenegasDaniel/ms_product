import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckProductDto } from './dto/check-product.dto';

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {
    
  }
  
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll() {
    const products = await this.productRepository.find();
    return products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async checkProduct(checkProductDto: CheckProductDto): Promise<boolean> {
    console.log(CheckProductDto.name);
    const product = await this.productRepository.findOne({ 
      where: {
        name: checkProductDto.name
      }
    })
    console.log(product);
    if(!product) return false;
    return true; 
  }
}

