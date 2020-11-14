import { Product } from '~/common/models';
import * as storeManager from './storeManager';

const PRODUCTS_FILE = 'products.json';

export const getProducts = async (): Promise<Product[]> =>
  await storeManager.getItems(PRODUCTS_FILE);

export const getProductsByCategoryId = async (categoryId: string): Promise<Product[]> =>
  await storeManager.getItemByField(PRODUCTS_FILE, { categoryId });

export const getProduct = async (id: string): Promise<Product | undefined> =>
  await storeManager.getItem(PRODUCTS_FILE, id);

export const addProduct = async (params: Omit<Product, 'id'>): Promise<void> =>
  await storeManager.addItem(PRODUCTS_FILE, params);

export const editProduct = async (product: Product): Promise<Product[] | undefined> =>
  await storeManager.editItem(PRODUCTS_FILE, product);

export const deleteProduct = async (id: string): Promise<Product[] | undefined> =>
  await storeManager.deleteItem(PRODUCTS_FILE, id);
