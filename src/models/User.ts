import mongoose from 'mongoose';

export interface IUser {
  googleId: string;
  displayName: string;
  displayPicURL: string;
  email: string;
  credits: number;
}

const { Schema } = mongoose;
const userSchema = new Schema<IUser>({
  googleId: String,
  displayName: String,
  displayPicURL: String,
  email: String,
  credits: { type: Number, default: 0 },
});

mongoose.model('users', userSchema);
