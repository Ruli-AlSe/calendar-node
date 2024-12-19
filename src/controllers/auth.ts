import { Request, Response } from 'express';

export const createUser = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  res.status(201).json({
    ok: true,
    message: 'register',
  });
};

export const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    message: 'login',
  });
};

export const revalidateToken = (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: 'renew',
  });
};
