import { Product, ProductParams } from '~/common/models';
import * as storeManager from './storeManager';

const PRODUCTS_FILE = 'products.json';

export const getProducts = async (): Promise<Product[]> =>
  await storeManager.getItems(PRODUCTS_FILE);

export const getProductsByCategoryId = async (
  categoryId: string,
): Promise<Product[]> =>
  await storeManager.getItemByField(PRODUCTS_FILE, { categoryId });

export const getProduct = async (id: string): Promise<Product> =>
  await storeManager.getItem(PRODUCTS_FILE, id);

export const addProduct = async (params: ProductParams): Promise<Product> =>
  await storeManager.addItem(PRODUCTS_FILE, params);

export const editProduct = async (product: Product): Promise<Product> =>
  await storeManager.editItem(PRODUCTS_FILE, product);

export const deleteProduct = async (id: string): Promise<Product[]> =>
  await storeManager.deleteItem(PRODUCTS_FILE, id);
