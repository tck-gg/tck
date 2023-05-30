import { model, Schema, models } from 'mongoose';

export interface IUser {
  id: string;
  createdAt: Date;
  apiKey?: string;
}
const userSchema = new Schema<IUser>({
  id: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true },
  apiKey: { type: String, required: false, unique: true }
});
export default models['User'] || model<IUser>('User', userSchema);
