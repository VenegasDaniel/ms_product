import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
//import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangeProductDto } from './dto/change-product.dto';
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
    return `This action returns a #${id} booking`;
  }

  async checkProduct(checkProductDTO: CheckProductDto): Promise<boolean> {
    console.log(checkProductDTO.id);
    const product = await this.productRepository.findOne({ 
      where: {
        id: checkProductDTO.id
      }
    })
    console.log(product);
    if(!product.state) return true;
    return false;
  }

  async updateState(changeProductDto: ChangeProductDto) {
    try {
      const result = await this.productRepository.update(changeProductDto.id, {
        state: changeProductDto.state,
      });
  
      if (result.affected > 0) {
        return true; 
      } else {
        return false;
      }
    } catch (error) {
      return error.message;; 
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

