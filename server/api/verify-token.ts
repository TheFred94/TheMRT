import { defineEventHandler, readBody } from 'h3';
import { getSessionByToken } from '../services/userService';

export default defineEventHandler(async (event) => {
  const { token } = await readBody<{ token: string }>(event);
  console.log('Verifying token:', token);

  const session = await getSessionByToken(token);

  if (session) {
    console.log('Token is valid');
    return { valid: true };
  } else {
    console.log('Token is invalid');
    event.node.res.statusCode = 401;
    return { valid: false, message: 'Invalid token' };
  }
});
