import {NextFunction, Request, Response} from 'express';
import {size} from 'lodash';

export const idHandler = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (size(id) !== 36) {
    next({status, message: 'Invalid ID'});
  } else {
    next();
  }
};
