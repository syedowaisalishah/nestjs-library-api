import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRE_IN || '1h';

  if (!secret) throw new Error('JWT_SECRET not set in environment');

  return {
    secret,
    signOptions: {
      expiresIn,
    },
  };
});
