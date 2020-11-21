import express from 'express';
import cors from 'cors';
import {
  clientErrorHandler,
  errorHandler,
  logErrors,
  logHandler,
} from '~/common/middlewares';

const app = express();

app.use(express.json());
app.use(cors());

app.use(logHandler);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

export default app;
