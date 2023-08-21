import { PromotionType } from 'src/app/products/entities/product.entity';
import { Cart } from '../../carts/entities/cart.entity';

import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  amount: number;

  @Column('decimal', { nullable: false, precision: 6, scale: 2 })
  price: number;

  @Column({ nullable: true })
  promotion: PromotionType;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  cart: Cart;

  @BeforeInsert()
  createUuid() {
    this.id = uuid();
  }
}
