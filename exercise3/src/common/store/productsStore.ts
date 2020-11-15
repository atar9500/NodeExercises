import { Product, ProductParams } from '~/common/models';
import { findCategory } from './categoriesStore';
import * as storeManager from './storeManager';

const PRODUCTS_FILE = 'products.json';

export const getProducts = async (): Promise<Product[]> =>
  await storeManager.getItems(PRODUCTS_FILE);

export const getProductsByCategoryId = async (
  categoryId: string,
): Promise<Product[]> => {
  await findCategory(categoryId);
  return await storeManager.getItemByField(PRODUCTS_FILE, { categoryId });
};

export const getProduct = async (id: string): Promise<Product> => {
  return await storeManager.getItem(PRODUCTS_FILE, id);
};

export const addProduct = async (params: ProductParams): Promise<Product> => {
  await findCategory(params.categoryId);
  try {
    return await storeManager.addItem(PRODUCTS_FILE, params);
  } catch (e) {
    throw e === storeManager.NOT_FOUND
      ? { status: e, message: 'Product not found!' }
      : e;
  }
};

export const editProduct = async (product: Product): Promise<Product> => {
  await findCategory(product.categoryId);
  try {
    console.log('productID', product.id);

    return await storeManager.editItem(PRODUCTS_FILE, product);
  } catch (e) {
    throw e === storeManager.NOT_FOUND
      ? { status: e, message: 'Product not found!' }
      : e;
  }
};

export const deleteProduct = async (id: string): Promise<Product[]> => {
  try {
    return await storeManager.deleteItem(PRODUCTS_FILE, id);
  } catch (e) {
    throw e === storeManager.NOT_FOUND
      ? { status: e, message: 'Product not found!' }
      : e;
  }
};
