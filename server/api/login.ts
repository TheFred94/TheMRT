import { defineEventHandler, readBody, setCookie } from 'h3';
import { v4 as uuidv4 } from 'uuid';
import {
  getUserByEmailAndPassword,
  setUserSession,
} from '../services/userService';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<{
    email: string;
    password: string;
  }>(event);
  console.log('Login request received for:', email, password);

  const user = await getUserByEmailAndPassword(email, password);

  if (user) {
    const token = uuidv4();
    console.log('Generated token:', token);

    await setUserSession(user.id, token);
    console.log('User session set for user ID:', user.id);

    setCookie(event, 'token', token, { httpOnly: true, sameSite: 'strict' });
    console.log('Token set in cookie');

    return { message: 'Login successful', token };
  } else {
    console.log('Invalid credentials');
    event.node.res.statusCode = 401;
    return { message: 'Invalid credentials' };
  }
});
