import fs from 'fs';
import { filter, size } from 'lodash';
import { dirname } from 'path';
import { StoreItem } from '~/common/models';
import { v4 as generateId } from 'uuid';

const BASE_URL = './src/common/assets';
export const NOT_FOUND = 404;

const saveToFile = async (filePath: string, data: any): Promise<void> => {
  const json = JSON.stringify(data, null, 2);
  const path = `${BASE_URL}/${filePath}`;

  const dir = dirname(path);
  await fs.promises.mkdir(dir, { recursive: true });

  await fs.promises.writeFile(path, json);
};

const readFromFile = async (
  filePath: string,
  defaultValue?: any,
): Promise<StoreItem[]> => {
  const path = `${BASE_URL}/${filePath}`;

  try {
    await fs.promises.access(path, fs.constants.F_OK);
  } catch (e) {
    console.error(`Trying to access non-existent file`, path);
    return defaultValue;
  }
  const json = await fs.promises.readFile(path);
  return JSON.parse(json.toString('utf8'));
};

export const getItems = async (filePath: string): Promise<StoreItem[]> =>
  await readFromFile(filePath, []);

export const getItemByField = async (
  filePath: string,
  params: object,
): Promise<StoreItem[]> => {
  const items = await getItems(filePath);
  return filter(items, params);
};

export const getItem = async (
  filePath: string,
  id: string,
): Promise<StoreItem | undefined> => {
  const items = await getItems(filePath);
  const item = items.find((item) => item.id === id);
  if (item) {
    return item;
  } else {
    throw NOT_FOUND;
  }
};

export const addItem = async (
  filePath: string,
  params: Omit<StoreItem, 'id'>,
): Promise<StoreItem> => {
  const item = { ...params, id: generateId() };
  const items = await getItems(filePath);

  await saveToFile(filePath, [...items, item]);
  return item;
};

export const editItem = async (
  filePath: string,
  modifiedItem: StoreItem,
): Promise<StoreItem> => {
  const items = await getItems(filePath);

  let exists = false;
  const updatedItems = items.map((item) => {
    if (item.id === modifiedItem.id) {
      exists = true;
      return modifiedItem;
    } else {
      return item;
    }
  });

  if (exists) {
    await saveToFile(filePath, updatedItems);
    return modifiedItem;
  } else {
    throw NOT_FOUND;
  }
};

export const deleteItem = async (
  filePath: string,
  id: string,
): Promise<StoreItem[]> => {
  const items = await getItems(filePath);
  const updatedItems = items.filter((item) => item.id !== id);

  const exists = size(items) !== size(updatedItems);
  if (exists) {
    await saveToFile(filePath, updatedItems);
    return updatedItems;
  } else {
    throw NOT_FOUND;
  }
};

export const deleteItemsByField = async (
  filePath: string,
  params: object,
): Promise<StoreItem[]> => {
  const items = await getItems(filePath);
  const itemIds = filter(items, params).map(({ id }) => id);
  const updatedItems = items.filter(({ id }) => !itemIds.includes(id));

  const hasChanged = size(items) !== size(updatedItems);
  if (hasChanged) {
    await saveToFile(filePath, updatedItems);
  }
  return updatedItems;
};
