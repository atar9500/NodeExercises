export interface ProductParams {
  categoryId: string;
  name: string;
  itemsInStock: number;
}

export type Product = ProductParams & { id: string };
