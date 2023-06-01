import bcrypt from 'bcrypt';

import { ISafeUser } from '../models/user';

import { getUserByEmail, getUserByUsername } from './user';

/**
 * Tries to login a user with their username.
 * @param username The username provided.
 * @param password The password provided.
 * @returns Returns a user object if the login was successful, `false` otherwise.
 */
export async function tryLoginWithUsername(
  username: string,
  password: string
): Promise<ISafeUser | null> {
  // Check if the user exists.
  const user = await getUserByUsername(username);
  if (!user) {
    return null;
  }

  // Check if password matches.
  const success = await bcrypt.compare(password, user.password as string);
  if (!success) {
    return null;
  }

  // Don't send the password hash to the client.
  user.password = undefined as any;

  return user;
}

/**
 * Tries to login a user with their email.
 * @param username The username provided.
 * @param password The password provided.
 * @returns Returns a user object if the login was successful, `false` otherwise.
 */
export async function tryLoginWithEmail(
  email: string,
  password: string
): Promise<ISafeUser | null> {
  // Check if the user exists.
  const user = await getUserByEmail(email);
  if (!user) {
    return null;
  }

  // Check if password matches.
  const success = await bcrypt.compare(password, user.password as string);
  if (!success) {
    return null;
  }

  // Don't send the password hash to the client.
  user.password = undefined as any;

  return user;
}
