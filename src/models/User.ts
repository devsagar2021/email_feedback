import mongoose from 'mongoose';

export interface IUser {
  googleId: string;
  displayName: string;
  displayPicURL: string;
}

const { Schema } = mongoose;
const userSchema = new Schema<IUser>({
  googleId: String,
  displayName: String,
  displayPicURL: String,
});

mongoose.model('users', userSchema);
