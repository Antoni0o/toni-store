import { Item } from '../../items/entities/item.entity';

import { IsNotEmpty, IsNumber } from 'class-validator';

export class CartResponseDto {
  @IsNotEmpty()
  products: Item[];

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
