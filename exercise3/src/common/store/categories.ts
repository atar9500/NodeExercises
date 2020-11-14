import { Category } from '~/common/models';
import * as storeManager from './storeManager';

const CATEGORIES_FILE = 'categories.json';

export const getCategories = async (): Promise<Category[]> =>
  await storeManager.getItems(CATEGORIES_FILE);

export const getCategoriesByCategoryId = async (categoryId: string): Promise<Category[]> =>
  await storeManager.getItemByField(CATEGORIES_FILE, { categoryId });

export const getCategory = async (id: string): Promise<Category | undefined> =>
  await storeManager.getItem(CATEGORIES_FILE, id);

export const addCategory = async (params: Omit<Category, 'id'>): Promise<void> =>
  await storeManager.addItem(CATEGORIES_FILE, params);

export const editCategory = async (product: Category): Promise<Category[] | undefined> =>
  await storeManager.editItem(CATEGORIES_FILE, product);

export const deleteCategory = async (id: string): Promise<Category[] | undefined> =>
  await storeManager.deleteItem(CATEGORIES_FILE, id);
