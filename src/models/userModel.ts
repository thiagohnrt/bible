import mongoose, { Schema } from "mongoose";

export interface User {
  username: string;
  password: string;
}

const UserSchema = new Schema<User>({
  username: String,
  password: String,
});

const UserModel = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;
