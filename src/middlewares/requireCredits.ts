import { NextFunction, Request, Response } from 'express';

const requireCredits = (req: Request, res: Response, next: NextFunction) => {
  // @ts-expect-error
  if (req.user?.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits!' });
  }
  next();
}

export default requireCredits;
