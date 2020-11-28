import { Category, CategoryParams } from '~/common/models';
import * as storeManager from './storeManager';

const CATEGORIES_FILE = 'categories.json';

export const getCategories = async (): Promise<Category[]> =>
  await storeManager.getItems(CATEGORIES_FILE);

export const findCategory = async (categoryId: string) => {
  const categories = await getCategories();
  const categoryExists = !!categories.find(({ id }) => id === categoryId);
  if (!categoryExists) {
    throw { status: storeManager.NOT_FOUND, message: 'Category not found!' };
  }
};

export const getCategory = async (id: string): Promise<Category> => {
  try {
    return await storeManager.getItem(CATEGORIES_FILE, id);
  } catch (e) {
    throw e === storeManager.NOT_FOUND
      ? { status: e, message: 'Category not found!' }
      : e;
  }
};

export const addCategory = async (params: CategoryParams): Promise<Category> =>
  await storeManager.addItem(CATEGORIES_FILE, params);

export const editCategory = async (category: Category): Promise<Category> => {
  try {
    return await storeManager.editItem(CATEGORIES_FILE, category);
  } catch (e) {
    throw e === storeManager.NOT_FOUND
      ? { status: e, message: 'Category not found!' }
      : e;
  }
};

export const deleteCategory = async (id: string): Promise<Category[]> => {
  try {
    return await storeManager.deleteItem(CATEGORIES_FILE, id);
  } catch (e) {
    throw e === storeManager.NOT_FOUND
      ? { status: e, message: 'Category not found!' }
      : e;
  }
};
