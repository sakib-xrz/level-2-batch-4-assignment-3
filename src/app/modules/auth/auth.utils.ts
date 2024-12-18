import jwt from 'jsonwebtoken';

const CreateToken = (
  jwtPayload: { id: string; email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

const AuthUtils = { CreateToken };

export default AuthUtils;
