import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Action } from '@prisma/client';
import { isValidEmail } from 'custom-util';
import { v4 as uuidv4 } from 'uuid';

import { prisma } from '../../client';
import { sendEmail } from '../../email';
import { getUserByEmail, getUserById, getUserByUsername } from './fetch';

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
          discord: null,
          kick: {
            create: undefined
          }
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

export async function banUser(targetId: string, moderator: string, ip: string) {
  await prisma.user.update({
    where: { id: targetId },
    data: {
      isBanned: true
    }
  });

  // Add user action for target.
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          id: targetId
        }
      },
      action: Action.ACCOUNT_BAN,
      timestamp: Date.now(),
      description: `Account banned by ${moderator}.`
    }
  });

  const target = await getUserById(targetId);
  if (!target) {
    return;
  }

  // Add user action for moderator.
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          username: moderator
        }
      },
      action: Action.ACCOUNT_BAN,
      ip,
      timestamp: Date.now(),
      description: `Banned ${target.username}.`
    }
  });
}

export async function unbanUser(targetId: string, moderator: string, ip: string) {
  await prisma.user.update({
    where: { id: targetId },
    data: {
      isBanned: false
    }
  });

  // Add user action for target.
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          id: targetId
        }
      },
      action: Action.ACCOUNT_BAN,
      timestamp: Date.now(),
      description: `Account unbanned by ${moderator}.`
    }
  });

  const target = await getUserById(targetId);
  if (!target) {
    return;
  }

  // Add user action for moderator.
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          username: moderator
        }
      },
      action: Action.ACCOUNT_BAN,
      ip,
      timestamp: Date.now(),
      description: `Unbanned ${target.username}.`
    }
  });
}

export async function deleteUser(userId: string, ip: string) {
  const user = await getUserById(userId);

  if (!user) {
    return false;
  }

  await prisma.userAction.deleteMany({
    where: { userId }
  });

  await prisma.accountVerification.deleteMany({
    where: { userId }
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      username: `Deleted User ${user.id.substring(user.id.length - 8, user.id.length)}`,
      email: '',
      password: '',
      apiKey: '',
      accounts: {
        delete: true
      },
      displayName: `Deleted User ${user.id.substring(user.id.length - 8, user.id.length)}`,
      isAnonymous: false,
      actions: {
        create: {
          action: Action.ACCOUNT_DELETE,
          ip: '',
          timestamp: Date.now(),
          description: 'Account has been deleted by user.'
        }
      },
      points: 0,
      permissions: [],
      isDeleted: true
    }
  });

  // Delete giveaway entries for unfinished giveaways.
  await prisma.giveawayEntry.deleteMany({
    where: {
      giveaway: {
        timestampEnd: {
          gt: Date.now()
        }
      },
      userId
    }
  });

  return true;
}

export async function getConnections(username: string) {
  const accounts = {
    kick: '',
    discord: '',
    roobet: ''
  };

  const user = await getUserByUsername(username);
  if (!user) {
    return accounts;
  }

  const fetchedAccounts = await prisma.userAccounts.findFirst({
    where: { userId: user.id },
    include: {
      kick: true
    }
  });

  if (!fetchedAccounts) {
    return accounts;
  }

  accounts.kick = fetchedAccounts.kick?.kickUsername || '';
  // TODO: Add Discord.
  accounts.roobet = fetchedAccounts.roobet || '';

  return accounts;
}
