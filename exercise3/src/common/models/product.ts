import { Item } from './item';

export interface Product extends Item {
  categoryId: string;
  name: string;
  itemsInStock: number;
}
