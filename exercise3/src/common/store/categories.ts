import { Category } from '~/common/models';
import { assetsManager } from '~/common/utils';

const CATEGORIES_FILE = 'categories.json';

export const getCategories = async (): Promise<Category[]> =>
  await assetsManager.getItems(CATEGORIES_FILE);

export const getCategoriesByCategoryId = async (categoryId: string): Promise<Category[]> =>
  await assetsManager.getItemByField(CATEGORIES_FILE, { categoryId });

export const getCategory = async (id: string): Promise<Category | undefined> =>
  await assetsManager.getItem(CATEGORIES_FILE, id);

export const addCategory = async (params: Omit<Category, 'id'>): Promise<void> =>
  await assetsManager.addItem(CATEGORIES_FILE, params);

export const editCategory = async (product: Category): Promise<Category[] | undefined> =>
  await assetsManager.editItem(CATEGORIES_FILE, product);

export const deleteCategory = async (id: string): Promise<Category[] | undefined> =>
  await assetsManager.deleteItem(CATEGORIES_FILE, id);
