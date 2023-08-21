import { PromotionType } from '../entities/product.entity';

import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsOptional()
  @IsEnum(PromotionType)
  promotion: PromotionType;
}
