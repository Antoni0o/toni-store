import { Item } from './entities/item.entity';
import { Cart } from '../carts/entities/cart.entity';
import { Product } from '../products/entities/product.entity';

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);

  @InjectRepository(Item)
  private readonly itemRepository: Repository<Item>;

  @InjectRepository(Cart)
  private readonly cartRepository: Repository<Cart>;

  async saveItem(product: Product, cartId: string): Promise<Item> {
    this.logger.log('[SaveItem] - Starting to create Cart Item');
    let item: Item;

    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: { items: true },
    });

    if (cart.items) {
      item = cart.items.find((item) => item.name === product.name);
    }

    if (item) {
      item.amount += 1;

      this.logger.log(`[SaveItem] - Cart Item created successfully`);
      return await this.itemRepository.save(item);
    } else {
      const item = new Item();

      item.cart = cart;
      item.name = product.name;
      item.price = product.price;
      item.promotion = product.promotion;
      item.amount = 1;

      this.logger.log(`[SaveItem] - Cart Item created successfully`);
      return await this.itemRepository.save(item);
    }
  }

  async updateItemAmount(id: string, amount: number) {
    this.logger.log(`[UpdateItemAmount] - Starting to update Cart Item amount`);
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) {
      this.logger.error(
        `[UpdateItemAmount] - Cart Item not found when trying to update amount`,
      );
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }

    item.amount = amount;

    this.logger.log(
      `[UpdateItemAmount] - Cart Item amount updated successfully`,
    );
    return this.itemRepository.save(item);
  }

  async removeItem(id: string): Promise<void> {
    this.logger.log('[RemoveItem] - Starting to remove Cart Item');
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) {
      this.logger.error('[RemoveItem] - Cart Item not found');
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }

    this.logger.log('[RemoveItem] - Cart Item removed successfully');
    await this.itemRepository.delete(id);
  }
}
