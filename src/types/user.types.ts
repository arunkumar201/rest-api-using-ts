import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
}
