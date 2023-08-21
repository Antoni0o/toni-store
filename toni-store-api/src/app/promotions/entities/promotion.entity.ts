export interface Promotion {
  promotionRule(price: number, amount: number): number;
}
