import { Router, Request, Response, NextFunction } from 'express';
import { CategoryParams } from '~/common/models';
import { categoriesStore, productsStore } from '~/common/store';
import { idHandler, dataNotFoundHandler } from '~/middlewares';

const router = Router();

router.get('/', async (req, res) => {
  const categories = await categoriesStore.getCategories();
  res.status(200).send(categories);
});

router.get(
  '/:id',
  idHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await categoriesStore.getCategory(req.params.id);
      res.status(200).send(category);
    } catch (e) {
      next(e);
    }
  },
  dataNotFoundHandler,
);

router.get(
  '/:id/products',
  idHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productsStore.getProductsByCategoryId(
        req.params.id,
      );
      res.status(200).send(products);
    } catch (e) {
      next(e);
    }
  },
  dataNotFoundHandler,
);

router.post('/', async (req, res) => {
  const params: CategoryParams = req.body;
  const category = await categoriesStore.addCategory(params);
  res.status(201).send(category);
});

router.put(
  '/:id',
  idHandler,
  async (req: Request, res: Response, next: NextFunction) => {
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
  },
  dataNotFoundHandler,
);

router.delete(
  '/:id',
  idHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoriesStore.deleteCategory(req.params.id);
      res.status(200).send(categories);
    } catch (e) {
      next(e);
    }
  },
  dataNotFoundHandler,
);

export const categoriesRouter = router;
