import { Request, Response } from 'express';

export const dataNotFoundHandler = (itemName: string) => (
  error: { status: number },
  req: Request,
  res: Response,
) => {
  res.status(error.status).send(`${itemName} not found!`);
};
