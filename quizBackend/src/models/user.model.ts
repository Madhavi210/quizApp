import { Schema, model, Document } from "mongoose";
import { IUser } from "../interfaces/IUser";

export interface IUserDocument extends IUser, Document {
    _id?: string;
    userName: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    profilePic: string;
    token?: string;
}

const userSchema = new Schema<IUserDocument>(
  {
    userName: { type: String, required: true, unique:true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "user"] },
    profilePic: { type: String, required: false },
    token : {type:String}
  },
  { timestamps: true }
);

export const UserModel = model<IUserDocument>("UserModel", userSchema);
