import { NextFunction, Request, Response } from 'express';

const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send({ error: 'User not logged in!' });
  }
  next();
}

export default requireLogin;
