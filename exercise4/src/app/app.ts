import express from 'express';
import cors from 'cors';
import {
  clientErrorHandler,
  errorHandler,
  logErrors,
  logHandler,
} from '~/common/middlewares';
import {categoriesRouter, productsRouter} from '~/routes';

const app = express();

app.use(express.json());
app.use(cors());

app.all('*', logHandler);

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

export default app;
