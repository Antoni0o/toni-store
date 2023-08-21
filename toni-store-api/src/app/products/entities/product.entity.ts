import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

// change to a specific class using polimorfism and SOLID principles
export enum PromotionType {
  TAKE2PAY1 = 'Leve 2 e Pague 1',
  TAKE3FOR10 = '3 por 10 reais',
  NOTHING = 'Nenhuma',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column('decimal', { nullable: false, precision: 6, scale: 2 })
  price: number;

  @Column({ nullable: true })
  promotion: PromotionType;

  @Column({ nullable: false })
  imageUrl: string;

  @BeforeInsert()
  createUuid() {
    this.id = uuid();
  }
}
