import { Cart } from '../entities/cart.entity';
import { Product } from 'src/app/products/entities/product.entity';
import { ItemsService } from 'src/app/items/items.service';

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateCartService {
  constructor(private readonly itemsService: ItemsService) {}

  private readonly logger = new Logger(UpdateCartService.name);

  @InjectRepository(Cart)
  private readonly cartRepository: Repository<Cart>;

  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  async execute(id: string, productIds: string[]): Promise<Cart> {
    if (!id) {
      this.logger.error(`[Update] - Id field is empty`);
      throw new HttpException('Id field is empty', HttpStatus.BAD_REQUEST);
    }

    this.logger.log(`[Update] - Starting to update Cart`);
    this.logger.log(
      `[Update] - Received Cart data to update: {${id}, ${productIds}}`,
    );
    const cart = await this.cartRepository.findOne({
      where: { id },
      relations: { items: true },
    });

    if (!cart) {
      this.logger.error(`[Update] - Cart not found by id: { ${id} }`);
      throw new HttpException('Cart not found by id', HttpStatus.NOT_FOUND);
    }

    productIds.map(async (id) => {
      const product = await this.productRepository.findOneBy({ id });
      await this.itemsService.saveItem(product, cart.id);
    });

    this.logger.log(`[Update] - Cart updated successfully`);
    return cart;
  }
}
