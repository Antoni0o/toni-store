import { Cart } from '../entities/cart.entity';
import { CartResponseDto } from '../dto/cart-response.dto';
import { PromotionsService } from 'src/app/promotions/promotions.service';

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FindCartAndValidateService {
  constructor(private readonly promotionsService: PromotionsService) {}

  private readonly logger = new Logger(FindCartAndValidateService.name);

  @InjectRepository(Cart)
  private readonly cartRepository: Repository<Cart>;

  async execute(id: string): Promise<CartResponseDto> {
    if (!id) {
      this.logger.error(`[Execute] - Id field is empty`);
      throw new HttpException('Id field is empty', HttpStatus.BAD_REQUEST);
    }

    const cart = await this.findOne(id);

    return this.validate(cart);
  }

  async findOne(id: string): Promise<Cart> {
    this.logger.log(`[FindOne] - Starting to find Cart by id: { ${id} }`);
    const cart = await this.cartRepository.findOne({
      where: { id },
      relations: { items: true },
    });

    if (!cart) {
      this.logger.error(`[FindOne] - Cart not found by id: { ${id} }`);
      throw new HttpException('Cart not found by id', HttpStatus.NOT_FOUND);
    }

    this.logger.log(`[FindOne] - Cart found successfully`);
    return cart;
  }

  validate(cart: Cart): CartResponseDto {
    this.logger.log(`[Validate] - Cart found. Starting to Validate`);
    const response = new CartResponseDto();
    response.products = [];
    response.totalPrice = 0;

    cart.items.map((item) => {
      response.products.push(item);
      if (item.promotion == null) {
        response.totalPrice += Number(item.price) * item.amount;
      } else {
        response.totalPrice += this.promotionsService.applyPromotionRules(
          Number(item.price),
          item.amount,
          item.promotion,
        );
      }
    });

    this.logger.log(`[Validate] - Cart validated successfully`);
    return response;
  }
}
