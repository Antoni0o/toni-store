import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';

@Module({
  providers: [PromotionsService],
  exports: [PromotionsService],
})
export class PromotionsModule {}
