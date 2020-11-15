import { Router } from 'express';
import { CategoryParams } from '~/common/models';
import { categoriesStore, productsStore } from '~/common/store';
import { idHandler } from '~/common/middlewares';

const router = Router();

router.get('/', async (req, res) => {
  const categories = await categoriesStore.getCategories();
  res.status(200).send(categories);
});

router.get('/:id', idHandler, async (req, res, next) => {
  try {
    const category = await categoriesStore.getCategory(req.params.id);
    res.status(200).send(category);
  } catch (e) {
    next(e);
  }
});

router.get('/:id/products', idHandler, async (req, res, next) => {
  try {
    await categoriesStore.findCategory(req.params.id);
    const products = await productsStore.getProductsByCategoryId(req.params.id);
    res.status(200).send(products);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res) => {
  const params: CategoryParams = req.body;
  const category = await categoriesStore.addCategory(params);
  res.status(201).send(category);
});

router.put('/:id', idHandler, async (req, res, next) => {
  try {
    const params: CategoryParams = req.body;
    const category = await categoriesStore.editCategory({
      ...params,
      id: req.params.id,
    });
    res.status(200).send(category);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', idHandler, async (req, res, next) => {
  try {
    const id = req.params.id;
    await categoriesStore.findCategory(id);
    await productsStore.deleteProductsByCategoryId(id);
    const categories = await categoriesStore.deleteCategory(id);
    res.status(200).send(categories);
  } catch (e) {
    next(e);
  }
});

export const categoriesRouter = router;
