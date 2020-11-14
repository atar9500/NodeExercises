import { Product } from '~/common/models';
import { assetsManager } from '~/common/utils';

const PRODUCTS_FILE = 'products.json';

export const getProducts = async (): Promise<Product[]> =>
  await assetsManager.getItems(PRODUCTS_FILE);

export const getProductsByCategoryId = async (categoryId: string): Promise<Product[]> =>
  await assetsManager.getItemByField(PRODUCTS_FILE, { categoryId });

export const getProduct = async (id: string): Promise<Product | undefined> =>
  await assetsManager.getItem(PRODUCTS_FILE, id);

export const addProduct = async (params: Omit<Product, 'id'>): Promise<void> =>
  await assetsManager.addItem(PRODUCTS_FILE, params);

export const editProduct = async (product: Product): Promise<Product[] | undefined> =>
  await assetsManager.editItem(PRODUCTS_FILE, product);

export const deleteProduct = async (id: string): Promise<Product[] | undefined> =>
  await assetsManager.deleteItem(PRODUCTS_FILE, id);
