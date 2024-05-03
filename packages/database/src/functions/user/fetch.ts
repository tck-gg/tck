import { prisma } from '../../client';

const includes = {
  accounts: {
    include: {
      discord: true,
      kick: true
    }
  },
  wallets: true,
  kickVerification: true
};

/**
 * Gets a user from the database by their UUID.
 * @param id The UUID of the user.
 * @returns The user, `null` if the user doesn't exist.
 */
export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id
    },
    include: includes
  });
}

/**
 * Gets a user from the database by their username.
 * @param username The username to get the user for.
 * @returns The user, `null` if the user doesn't exist.
 */
export async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: {
      username
    },
    include: includes
  });
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
      },
      include: includes
    })
  )[0];
}

/**
 * Gets a user from the database by their authorization/API key.
 * @param authorization The user's API key/authorization.
 * @returns The user, `null` if the user doesn't exist.
 */
export async function getUserByAuthorization(authorization: string) {
  return await prisma.user.findUnique({
    where: { apiKey: authorization },
    include: includes
  });
}

export async function getUserByKickId(kickId: number) {
  return await prisma.user.findFirst({
    where: {
      accounts: {
        kick: {
          kickId
        }
      }
    },
    include: includes
  });
}
