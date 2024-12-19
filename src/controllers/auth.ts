import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { generateJWT } from '../helpers/jwt';

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        message: 'User already exists in the DB',
      });
    }

    user = new User({ name, email, password });

    // * encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user.id, name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(JSON.stringify(error));

    res.status(500).json({
      ok: false,
      message: 'Error - Please contact your system administrator',
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: 'User does not exist in the DB',
      });
    }

    // * Confirm password
    const validPassword = bcrypt.compareSync(password, String(user.password));

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: 'Email or password are incorrect',
      });
    }

    const token = await generateJWT(user.id, user.name!);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(JSON.stringify(error));

    res.status(500).json({
      ok: false,
      message: 'Error - Please contact your system administrator',
    });
  }
};

export const revalidateToken = async (
  req: Request & { uid?: string; name?: string },
  res: Response
) => {
  const uid = req.uid;
  const name = req.name;

  const token = await generateJWT(uid!, name!);

  res.json({
    ok: true,
    token,
    uid,
    name,
  });
};
