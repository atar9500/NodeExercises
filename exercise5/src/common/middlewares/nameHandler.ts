import {NextFunction, Request, Response} from 'express';
import {size} from 'lodash';

export const nameHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (size(req.body.name) < 3) {
    next({
      status: 409,
      message: 'Invalid Name, has to contain least 2 characters',
    });
  } else {
    next();
  }
};
