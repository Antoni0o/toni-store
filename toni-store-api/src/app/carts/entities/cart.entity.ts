import { Item } from '../../items/entities/item.entity';

import {
  BeforeInsert,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Item, (item) => item.cart)
  items: Item[];

  @BeforeInsert()
  createUuid() {
    this.id = uuid();
  }
}
