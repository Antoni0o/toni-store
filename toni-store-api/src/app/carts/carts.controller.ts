import { SaveCartService } from './services/save-cart.service';
import { FindCartAndValidateService } from './services/find-cart-and-validate.service';
import { RemoveCartService } from './services/remove-cart.service';
import { UpdateCartService } from './services/update-cart.service';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('carts')
export class CartsController {
  constructor(
    private readonly saveCartService: SaveCartService,
    private readonly findCartAndValidateService: FindCartAndValidateService,
    private readonly updateCartService: UpdateCartService,
    private readonly removeCartService: RemoveCartService,
  ) {}

  @Post(':productId')
  create(@Param('productId') productId: string) {
    return this.saveCartService.execute(productId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findCartAndValidateService.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() productIds: string[]) {
    return this.updateCartService.execute(id, productIds);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeCartService.execute(id);
  }
}
