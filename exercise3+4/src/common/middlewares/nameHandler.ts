import { NextFunction, Request, Response } from 'express';
import { size } from 'lodash';
import { ProductParams } from '~/common/models';

export const nameHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name }: ProductParams = req.body;
  if (size(name) < 3) {
    res.status(409).send('Name has to contain least 2 characters');
  } else {
    next();
  }
};
