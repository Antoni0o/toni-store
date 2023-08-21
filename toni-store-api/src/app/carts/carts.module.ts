import { Cart } from './entities/cart.entity';
import { CartsController } from './carts.controller';
import { Product } from '../products/entities/product.entity';
import { Item } from '../items/entities/item.entity';
import { SaveCartService } from './services/save-cart.service';
import { ItemsModule } from '../items/items.module';
import { FindCartAndValidateService } from './services/find-cart-and-validate.service';
import { RemoveCartService } from './services/remove-cart.service';
import { UpdateCartService } from './services/update-cart.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionsModule } from '../promotions/promotions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Product, Item]),
    ItemsModule,
    PromotionsModule,
  ],
  controllers: [CartsController],
  providers: [
    SaveCartService,
    FindCartAndValidateService,
    RemoveCartService,
    UpdateCartService,
  ],
})
export class CartsModule {}
