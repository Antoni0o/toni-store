import { PromotionType } from '../entities/product.entity';

import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsEnum(PromotionType)
  promotion: PromotionType;
}
