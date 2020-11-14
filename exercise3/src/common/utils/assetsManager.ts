import fs from 'fs';
import { filter, size } from 'lodash';
import { dirname } from 'path';
import { Item } from '~/common/models';
import { generateId } from './generateId';

const BASE_URL = './src/assets';

type AssetType = Item & any;

const saveToFile = async (filePath: string, data: any): Promise<void> => {
  const json = JSON.stringify(data);
  const path = `${BASE_URL}/${filePath}`;

  const dir = dirname(path);
  await fs.promises.mkdir(dir, { recursive: true });

  await fs.promises.writeFile(path, json);
};

const readFromFile = async (filePath: string, defaultValue?: any): Promise<AssetType[]> => {
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

export const getItems = async (filePath: string): Promise<AssetType[]> => await readFromFile(filePath, []);

export const getItemByField = async (filePath: string, params: object): Promise<any[]> => {
  const items = await getItems(filePath);
  return filter(items, params);
};

export const getItem = async (filePath: string, id: string): Promise<any | undefined> => {
  const items = await getItems(filePath);
  return items.find((item) => item.id === id);
};

export const addItem = async (filePath: string, params: AssetType): Promise<void> => {
  const item = { ...params, id: generateId() };
  const items = await getItems(filePath);

  await saveToFile(filePath, [...items, item]);
};

export const editItem = async (filePath: string, modifiedItem: AssetType): Promise<AssetType[] | undefined> => {
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
    return updatedItems;
  }
};

export const deleteItem = async (filePath: string, id: string): Promise<AssetType[] | undefined> => {
  const items = await getItems(filePath);
  const updatedItems = items.filter((item) => item.id !== id);

  const exists = size(items) !== size(updatedItems);
  if (exists) {
    await saveToFile(filePath, updatedItems);
    return updatedItems;
  }
};
