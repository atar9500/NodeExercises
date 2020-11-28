import { NextFunction, Request, Response } from 'express';
import { size } from 'lodash';

export const idHandler = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (size(id) !== 36) {
    res.status(400).send('INVALID ID');
  } else {
    next();
  }
};
