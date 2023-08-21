import { Promotion } from './promotion.entity';

export class Take3For10Promotion implements Promotion {
  promotionRule(price: number, amount: number): number {
    if (amount > 1) {
      const promotionalAmount = Math.floor(amount / 3);
      if (amount % 3 == 0) {
        return 10 * promotionalAmount;
      }
      const nonPromotionalAmount = amount - promotionalAmount * 3;
      return price * nonPromotionalAmount + 10 * promotionalAmount;
    }

    return price;
  }
}
