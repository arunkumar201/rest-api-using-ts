import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  userName: string;
  email: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
  createdAt: Date;
}
