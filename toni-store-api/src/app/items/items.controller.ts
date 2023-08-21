import { ItemsService } from './items.service';

import { Controller, Delete, Patch, Param } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Patch('/:id/:amount')
  updateItemAmount(@Param('id') id: string, @Param('amount') amount: number) {
    return this.itemsService.updateItemAmount(id, amount);
  }

  @Delete('/:id')
  removeItem(@Param('id') id: string) {
    return this.itemsService.removeItem(id);
  }
}
