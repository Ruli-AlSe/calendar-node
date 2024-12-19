import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validateToken = (
  req: Request & { uid?: string; name?: string },
  res: Response,
  next: NextFunction
) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'Token is missing in the request',
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED!) as {
      uid: string;
      name: string;
    };

    req.uid = payload.uid;
    req.name = payload.name;
  } catch (error) {
    console.error(JSON.stringify(error));

    return res.status(401).json({
      ok: false,
      message: 'Invalid token',
    });
  }

  next();
};
