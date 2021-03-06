import {NextFunction, Request, Response} from 'express';

export const logErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err?.stack) {
    console.error(err.stack);
  }
  next(err);
};

export const clientErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.xhr && error.status) {
    res.status(error.status).send({error: error.message});
  } else {
    next(error);
  }
};

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).render('error', {error});
};
