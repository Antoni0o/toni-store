import { Promotion } from './promotion.entity';

export class Take2Pay1Promotion implements Promotion {
  promotionRule(price: number, amount: number): number {
    if (amount > 1) {
      const newAmount = Math.floor(amount / 2) + (amount % 2);
      return price * newAmount;
    }
    return price;
  }
}
