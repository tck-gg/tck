import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Action } from '@prisma/client';
import { isValidEmail } from 'custom-util';
import { v4 as uuidv4 } from 'uuid';

import { prisma } from '../client';
import { sendEmail } from '../email';

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
  return (
    await prisma.user.findMany({
      where: {
        email: {
          equals: email,
          // Backwards compatibility.
          mode: 'insensitive'
        }
      }
    })
  )[0];
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
  inputUsername: string,
  inputEmail: string,
  password: string,
  ip: string
): Promise<boolean> {
  const username = inputUsername.trim();
  const email = inputEmail.trim().toLowerCase();

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

  const verificationUuid = uuidv4();

  // Create the verification.
  await prisma.accountVerification.create({
    data: {
      user: {
        connect: {
          username
        }
      },
      uuid: verificationUuid
    }
  });

  // Send the verification email.
  await sendEmail({
    to: email,
    subject: 'Verify your TCK.gg account.',
    html: `<p>Click <a href="https://tck.gg/verify?uuid=${verificationUuid}">here</a> to verify your account.</p>`
  });

  return true;
}

export async function verifyAccount(uuid: string) {
  const verification = await prisma.accountVerification.findFirst({
    where: { uuid }
  });

  if (!verification) {
    return false;
  }

  await prisma.user.update({
    where: { id: verification.userId },
    data: {
      isVerified: true
    }
  });

  await prisma.accountVerification.delete({
    where: { id: verification.id }
  });

  return true;
}

export async function getActivity(username: string) {
  const user = await getUserByUsername(username);
  if (!user) {
    return null;
  }

  const actions = await prisma.userAction.findMany({
    where: { userId: user.id },
    orderBy: { timestamp: 'desc' }
  });

  return actions;
}

export async function banUser(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      isBanned: true
    }
  });
}

export async function unbanUser(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      isBanned: false
    }
  });
}

export async function deleteUser(userId: string) {
  const user = await getUserById(userId);

  if (!user) {
    return false;
  }

  if (user.isVerified) {
    // Delete more stuff.
  }

  // await prisma.user.delete({
  //   where: { id: userId }
  // });

  console.log('"""""Deleted"""""');

  return true;
}
