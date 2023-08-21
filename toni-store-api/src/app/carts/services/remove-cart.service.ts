import { Cart } from '../entities/cart.entity';

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RemoveCartService {
  private readonly logger = new Logger(RemoveCartService.name);

  @InjectRepository(Cart)
  private readonly cartRepository: Repository<Cart>;

  async execute(id: string): Promise<void> {
    if (!id) {
      this.logger.error(`[Remove] - Id field is empty`);
      throw new HttpException('Id field is empty', HttpStatus.BAD_REQUEST);
    }

    this.logger.log(`[Remove] - Starting to remove Cart with id: { ${id} }`);
    const cart = this.cartRepository.findOneBy({ id });

    if (!cart) {
      this.logger.error(`[Remove] - Cart not found by id: { ${id} }`);
      throw new HttpException('Cart not found by id', HttpStatus.NOT_FOUND);
    }

    this.cartRepository.delete(id);
    this.logger.log(`[Remove] - Cart removed successfully`);
  }
}
