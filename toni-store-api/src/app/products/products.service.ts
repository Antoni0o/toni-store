import { Product, PromotionType } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GenerateImageService } from '../../common/services/generate-image.service';

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(private readonly generateImage: GenerateImageService) {}

  private readonly logger = new Logger(ProductsService.name);

  @InjectRepository(Product)
  private readonly repository: Repository<Product>;

  async create(createProductDto: CreateProductDto): Promise<Product> {
    this.logger.log(`[Create] - Starting to create Product`);
    this.logger.log(
      `[Create] - Received Product data: {${createProductDto.name}}`,
    );

    let product = new Product();
    product.name = createProductDto.name;
    product.price = createProductDto.price;
    product.promotion = createProductDto.promotion;
    product.imageUrl = await this.generateImage.execute(createProductDto.name);

    product = await this.repository.save(product);

    this.logger.log(`[Create] - Product created successfully: {${product.id}}`);
    return product;
  }

  async findAll(): Promise<Array<Product>> {
    this.logger.log(`[FindAll] - Starting to findAll Products`);
    const products = await this.repository.find();

    this.logger.log(`[FindAll] - All Products found successfully`);
    return products;
  }

  async findOne(id: string): Promise<Product> {
    if (!id) {
      this.logger.error(`[FindAll] - Id field is empty`);
      throw new HttpException('Id field is empty', HttpStatus.BAD_REQUEST);
    }

    this.logger.log(`[FindAll] - Starting to find Product by id: { ${id} }`);
    const product = await this.repository.findOneBy({ id });

    if (!product) {
      this.logger.error(`[FindAll] - Product not found by id: { ${id} }`);
      throw new HttpException('Product not found by id', HttpStatus.NOT_FOUND);
    }

    this.logger.log(`[FindAll] - Product found successfully: [${product}]`);
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    if (!id) {
      this.logger.error(`[Update] - Id field is empty`);
      throw new HttpException('Id field is empty', HttpStatus.BAD_REQUEST);
    }

    this.logger.log(`[Update] - Starting to update Product`);
    this.logger.log(
      `[Update] - Received Product data to update: {${id}, ${UpdateProductDto.name}}`,
    );
    const product = await this.repository.findOneBy({ id });

    if (!product) {
      this.logger.error(`[Update] - Product not found by id: { ${id} }`);
      throw new HttpException('Product not found by id', HttpStatus.NOT_FOUND);
    }

    Object.assign(product, updateProductDto);

    if (product.promotion == PromotionType.NOTHING) {
      product.promotion = null;
    }

    this.logger.log(`[Update] - Product updated successfully: [${product.id}]`);
    return await this.repository.save(product);
  }

  remove(id: string): void {
    if (!id) {
      this.logger.error(`[Remove] - Id field is empty`);
      throw new HttpException('Id field is empty', HttpStatus.BAD_REQUEST);
    }

    this.logger.log(`[Remove] - Starting to remove Product with id: { ${id} }`);
    const product = this.repository.findOneBy({ id });

    if (!product) {
      this.logger.error(`[Remove] - Product not found by id: { ${id} }`);
      throw new HttpException('Product not found by id', HttpStatus.NOT_FOUND);
    }

    this.repository.delete(id);
    this.logger.log(`[Remove] - Product removed successfully`);
  }
}
