import { Cart } from '../entities/cart.entity';
import { Product } from 'src/app/products/entities/product.entity';
import { ItemsService } from 'src/app/items/items.service';

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SaveCartService {
  constructor(private readonly itemsService: ItemsService) {}

  private readonly logger = new Logger(SaveCartService.name);

  @InjectRepository(Cart)
  private readonly cartRepository: Repository<Cart>;

  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  async execute(productId: string, id?: string): Promise<Cart> {
    this.logger.log(`[Create] - Starting to create Cart`);
    this.logger.log(`[Create] - Received Cart data: { ${productId} }`);

    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      this.logger.error(
        `[Create] - Product not found by productId when trying to create cart`,
      );
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    if (id) {
      await this.cartRepository.findOneBy({ id });
    }

    const cart = new Cart();

    await this.cartRepository.save(cart);

    await this.itemsService.saveItem(product, cart.id);

    this.logger.log(`[Create] - Cart created successfully: {${cart.id}}`);
    return cart;
  }
}
