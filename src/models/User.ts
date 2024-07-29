import mongoose, { Schema } from 'mongoose';

export interface IUser {
  _id?: Schema.Types.ObjectId;
  googleId: string;
  displayName: string;
  displayPicURL: string;
  email: string;
  credits: number;
}

const userSchema = new Schema<IUser>({
  googleId: String,
  displayName: String,
  displayPicURL: String,
  email: String,
  credits: { type: Number, default: 0 },
});

mongoose.model('users', userSchema);
