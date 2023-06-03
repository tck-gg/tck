import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Action } from '@prisma/client';

import { isValidEmail } from '@/util/email';
import prisma from '../database';

/**
 * Gets a user from the database by their UUID.
 * @param id The UUID of the user.
 * @returns The user, `null` if the user doesn't exist.
 */
export async function getUserById(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}

/**
 * Gets a user from the database by their username.
 * @param username The username to get the user for.
 * @returns The user, `null` if the user doesn't exist.
 */
export async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({ where: { username } });
}

/**
 * Gets a user from the database by their email.
 * @param email The email to look for.
 * @returns The user, `null` if the user doesn't exist.
 */
export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

/**
 * Gets a user from the database by their authorization/API key.
 * @param authorization The user's API key/authorization.
 * @returns The user, `null` if the user doesn't exist.
 */
export async function getUserByAuthorization(authorization: string) {
  return await prisma.user.findUnique({ where: { apiKey: authorization } });
}

/**
 * Tries to create a user and add it to the database. Checks if there is an existing user with the username and email provided.
 * @param username The username to create.
 * @param email The email to create.
 * @param password The password associated with the account.
 * @param ip The IP address of the user.
 * @returns `true` if the user was created, `false` otherwise.
 */
export async function createUser(
  username: string,
  email: string,
  password: string,
  ip: string
): Promise<boolean> {
  const existingUsernameUser = await getUserByUsername(username);
  const existingEmailUser = await getUserByEmail(email);

  // If a user exists with the specified username or email already.
  if (existingUsernameUser || existingEmailUser) {
    return false;
  }

  // Username must be between 3 and 32 characters long.
  if (username.length < 3 || username.length > 32) {
    return false;
  }
  // Email must be valid.
  if (!isValidEmail(email)) {
    return false;
  }
  // Password must be at least 8 characters long.
  if (password.length < 8) {
    return false;
  }

  // Create the user.
  await prisma.user.create({
    data: {
      username,
      email,
      apiKey: crypto.randomBytes(32).toString('hex'),
      actions: {
        create: {
          action: Action.ACCOUNT_CREATE,
          ip,
          timestamp: Date.now()
        }
      },
      password: await bcrypt.hash(password, 12),
      displayName: username,
      accounts: {
        create: {
          twitch: null,
          discord: null
        }
      }
    }
  });

  return true;
}
