import { model, Schema, models } from 'mongoose';

export interface IUser {
  id: string;
  createdAt: Date;
}
const userSchema = new Schema<IUser>({
  id: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true }
});

export default models['User'] || model<IUser>('User', userSchema);
