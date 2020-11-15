import { NextFunction, Request, Response } from 'express';

export const logHandler = (req: Request, res: Response, next: NextFunction) => {
  console.log('[REQUEST RECEIVED]', req.url);
  res.on('finish', () => console.log('[REQUEST ENDED]', req.url));
  next();
};
