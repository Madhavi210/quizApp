import { injectable } from 'inversify';
import { UserModel } from '../models/user.model';
import { IUser } from '../interfaces/IUser';
import bcrypt from 'bcrypt';
import { promises } from 'dns';
import { DeleteResult } from 'mongodb'; // Import DeleteResult
import jwt from 'jsonwebtoken';
import session from 'express-session';
import { Request , Response} from 'express';

export interface IUserService {
    createUser(userData: IUser): Promise<IUser>;
    findByIdUser(id: string): Promise<IUser | null>;
    findAllUser(): Promise<IUser[]>;
    updateUser(id: string, userData: IUser): Promise<IUser | null>;
    deleteUser(id: string): Promise<boolean>;
    deleteAll(): Promise<DeleteResult>;
    loginUser(loginData: { userNameOrEmail: string, password: string }, req:any ): Promise<string | null> ;
}

declare module 'express-session' {
    interface SessionData {
        user: {
            id: string;
            userName: string;
            email: string;
            role: string;
        };
    }
}

@injectable()

export class UserService implements IUserService {
    async createUser(userData: IUser): Promise<IUser> {
        const { userName, email, password, role, profilePic } = userData;
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser: IUser = {
            userName,
            email,
            password: hashedPassword, // Save hashed password
            role,
            profilePic,
        };
        return await UserModel.create(newUser);
    }
    async findByIdUser(id: string): Promise<IUser | null> {
        return await UserModel.findById(id).exec();
    }

    async findAllUser(): Promise<IUser[]> {
        return await UserModel.find().exec();
    }

    async updateUser(id: string, userData: IUser): Promise<IUser | null> {
        console.log(id, userData);
        console.log("uppp");
        
        return await UserModel.findByIdAndUpdate(id, userData, { new: true }).exec();
    }

    async deleteUser(id: string): Promise<boolean> {
        const result = await UserModel.findByIdAndDelete(id).exec();
        return result !== null;
    }

    async deleteAll(): Promise<DeleteResult> {
        return  await UserModel.deleteMany({}).exec();

    }

    async loginUser(loginData: { userNameOrEmail: string, password: string }, req:Request): Promise<string | null> {
            const { userNameOrEmail, password } = loginData;            
            const user = await UserModel.findOne({ $or: [{ email:userNameOrEmail }, { userName:userNameOrEmail }] });            
            if (!user) {
                return null ;
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return null;
            }
            const token = jwt.sign({ userId: user._id }, "key") ?? '';
            const updatedUser = await UserModel.findByIdAndUpdate(
                user._id,
                { $set: { token } },
                { new: true }
            );
            req.session.user = {
                id: user.id,
                userName: user.userName,
                email: user.email,
                role: user.role
            };
            return token;        
    }


}