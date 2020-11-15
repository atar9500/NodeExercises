import { NextFunction, Request, Response } from 'express';

export const logErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack);
  next(err);
};

export const clientErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.xhr) {
    res.status(500).send({ error: 'Something went wrong!' });
  } else {
    next(err);
  }
};

export const errorHandler = (err: Error, req: Request, res: Response) => {
  res.status(500);
  res.render('error', { error: err });
};
