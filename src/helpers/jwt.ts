import jwt from 'jsonwebtoken';

export const generateJWT = (uid: string, name: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED!,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          console.error(JSON.stringify(err));

          reject('Token could not be generated');
        }

        resolve(token);
      }
    );
  });
};
