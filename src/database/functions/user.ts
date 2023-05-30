import { v4 as uuidv4 } from 'uuid';

import User, { IUser } from '../models/user';

// TODO: Test this.

/**
 * Finds a user by their UUID.
 *
 * @param id The UUID of the user.
 * @returns The user object.
 */
export async function getUserById(id: string) {
  return await User.findOne({ id });
}

// TODO: createUser() using Twitch OAuth.
