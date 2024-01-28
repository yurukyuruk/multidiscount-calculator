export interface DiscountInputValue {
  itemCount: string;
  discount: string;
}

export interface ProductInputValue {
  productName: string;
  price: string;
}

export interface ProductAndItsDiscountWithItemCount {
  productName: string;
  itemCount: number;
  discountRatio: number;
  discountAmount: number;
}

export type ProductsAndTheirDiscountsWithItemCount = ProductAndItsDiscountWithItemCount[];

export interface ProductGroupWithItsDiscountRatioAndDiscount {
  productNames: string[];
  itemCount: number;
  discountRatio: number;
  discountAmount: number;
}
export type deleteButtonCallbackFunction = () => void;
