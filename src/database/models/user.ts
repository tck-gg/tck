import { model, Schema, models } from 'mongoose';

export interface ISafeUser {
  id: string;
  username: string;
  email: string;
  apiKey: string;
  createdAt: Date;

  displayName?: string;
  accounts: {
    twitch?: string;
    discord?: string;
  };
}
export interface IUser extends ISafeUser {
  password: string;
}

const userSchema = new Schema<IUser>({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  apiKey: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true, default: Date.now },

  displayName: { type: String, required: false },
  accounts: {
    twitch: { type: String, default: null }
  }
});

export default models['User'] || model<IUser>('User', userSchema);
