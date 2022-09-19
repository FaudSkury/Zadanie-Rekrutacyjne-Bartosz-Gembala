import { Schema, model } from "mongoose";
//User mode interface so mongoose can be used with TS
export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const userSchema = new Schema<IUser>({
  id: { type: Number, required: true },
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
