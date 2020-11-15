import express from 'express';
import cors from 'cors';
import { categoriesRouter, productsRouter } from '~/routes';
import {
  clientErrorHandler,
  errorHandler,
  logErrors,
  logHandler,
} from './middlewares';

const app = express();

app.use(express.json());
app.use(cors());

app.use(logHandler);

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

export default app;
