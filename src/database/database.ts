import mongoose, { ConnectOptions, Mongoose } from 'mongoose';
import * as dotenv from 'dotenv';

import { databaseLog } from '@/util/log';

dotenv.config();

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    connection: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

// Database setup.
const databaseUrl = `mongodb+srv://${process.env.DB_USERNAME}:${encodeURIComponent(
  process.env.DB_PASSWORD as string
)}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;

// Dismiss deprecation warning.
mongoose.set('strictQuery', false);

// Cached connection.
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

export async function connect() {
  if (!process.env.DB_PASSWORD) {
    throw new Error('No database password provided.');
  }

  // Return the cached connection if it exists already.
  if (cached.connection) {
    return cached.connection;
  }

  // Create a new promise if it doesn't exist.
  if (!cached.promise) {
    const connectionOptions: ConnectOptions = {
      dbName: `${process.env.DB_NAME}${process.env.NODE_ENV && '-dev'}`
    };
    cached.promise = mongoose.connect(databaseUrl, connectionOptions);
  }

  try {
    // Try to connect and cache it.
    cached.connection = await cached.promise;

    databaseLog('Cached connection.');
  } catch (error) {
    throw error;
  }

  return cached.connection;
}
