import { ProductsModule } from './app/products/products.module';
import { TypeOrmConfigService } from './common/services/typeorm.service';
import { CartsModule } from './app/carts/carts.module';
import { ItemsModule } from './app/items/items.module';

import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionsModule } from './app/promotions/promotions.module';

@Module({
  imports: [
    ProductsModule,
    CartsModule,
    ItemsModule,
    PromotionsModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
  providers: [Logger],
})
export class AppModule {}
