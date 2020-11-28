import { Router } from 'express';
import { ProductParams } from '~/common/models';
import { categoriesStore, productsStore } from '~/common/store';
import { idHandler, nameHandler } from '~/common/middlewares';

const router = Router();

router.get('/', async (req, res) => {
  const products = await productsStore.getProducts();
  res.status(200).send(products);
});

router.get('/:id', idHandler, async (req, res, next) => {
  try {
    const product = await productsStore.getProduct(req.params.id);
    res.status(200).send(product);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const params: ProductParams = req.body;
    await categoriesStore.findCategory(params.categoryId);
    const product = await productsStore.addProduct(params);
    res.status(201).send(product);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', idHandler, nameHandler, async (req, res, next) => {
  try {
    const params: ProductParams = req.body;
    await categoriesStore.findCategory(params.categoryId);
    const product = await productsStore.editProduct({
      ...params,
      id: req.params.id,
    });
    res.status(200).send(product);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', idHandler, async (req, res, next) => {
  try {
    const products = await productsStore.deleteProduct(req.params.id);
    res.status(200).send(products);
  } catch (e) {
    next(e);
  }
});

export const productsRouter = router;
