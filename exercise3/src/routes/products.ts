import { Router, Request, Response, NextFunction } from 'express';
import { ProductParams } from '~/common/models';
import { productsStore } from '~/common/store';
import { idHandler, dataNotFoundHandler, nameHandler } from '~/middlewares';

const router = Router();

router.get('/', async (req, res) => {
  const products = await productsStore.getProducts();
  res.status(200).send(products);
});

router.get(
  '/:id',
  idHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productsStore.getProduct(req.params.id);
      res.status(200).send(product);
    } catch (e) {
      next(e);
    }
  },
  dataNotFoundHandler,
);

router.post('/', async (req, res) => {
  const params: ProductParams = req.body;
  const product = await productsStore.addProduct(params);
  res.status(201).send(product);
});

router.put(
  '/:id',
  idHandler,
  nameHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params: ProductParams = req.body;
      const product = await productsStore.editProduct({
        ...params,
        id: req.params.id,
      });
      res.status(200).send(product);
    } catch (e) {
      next(e);
    }
  },
  dataNotFoundHandler,
);

router.delete(
  '/:id',
  idHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productsStore.deleteProduct(req.params.id);
      res.status(200).send(products);
    } catch (e) {
      next(e);
    }
  },
  dataNotFoundHandler,
);

export const productsRouter = router;
