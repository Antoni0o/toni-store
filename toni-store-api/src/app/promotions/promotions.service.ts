import { PromotionType } from '../products/entities/product.entity';
import { Take2Pay1Promotion } from './entities/take-2-pay-1-promotion.entity';

import { Injectable } from '@nestjs/common';
import { Take3For10Promotion } from './entities/take-3-for-10-promotion.entity';

@Injectable()
export class PromotionsService {
  applyPromotionRules(
    price: number,
    amount: number,
    promotionType: PromotionType,
  ) {
    if (promotionType == PromotionType.TAKE2PAY1) {
      return new Take2Pay1Promotion().promotionRule(price, amount);
    }

    if (promotionType == PromotionType.TAKE3FOR10) {
      return new Take3For10Promotion().promotionRule(price, amount);
    }
  }
}
