import { Category, CategoryParams } from '~/common/models';
import * as storeManager from './storeManager';

const CATEGORIES_FILE = 'categories.json';

export const getCategories = async (): Promise<Category[]> =>
  await storeManager.getItems(CATEGORIES_FILE);

export const getCategoriesByCategoryId = async (
  categoryId: string,
): Promise<Category[]> => {
  const categories = await getCategories();
  const categoryExists = !!categories.find(({ id }) => id === categoryId);
  if (!categoryExists) {
    throw { status: 404 };
  }
  return await storeManager.getItemByField(CATEGORIES_FILE, { categoryId });
};

export const getCategory = async (id: string): Promise<Category> =>
  await storeManager.getItem(CATEGORIES_FILE, id);

export const addCategory = async (params: CategoryParams): Promise<Category> =>
  await storeManager.addItem(CATEGORIES_FILE, params);

export const editCategory = async (product: Category): Promise<Category> =>
  await storeManager.editItem(CATEGORIES_FILE, product);

export const deleteCategory = async (id: string): Promise<Category[]> =>
  await storeManager.deleteItem(CATEGORIES_FILE, id);
