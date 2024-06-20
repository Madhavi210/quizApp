import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/IUser';
import { UserModel } from '../models/user.model';
import { IUserService } from '../services/user.service';
// import { injectSession } from '../decorators/session';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TYPES } from '../config/types';
import session from 'express-session';
import { log } from 'console';


interface AuthenticatedRequest extends Request {
    user?: IUser;
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
export class AuthMiddleware {
    constructor(
        @inject(TYPES.UserService) private userService: UserService
    ) {}


    loginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userNameOrEmail, password } = req.body;
            if (!password || !userNameOrEmail) {
                return res.status(400).json("Email/Username and password are required");
            }
            // Use either email or name to find user
            const user = await UserModel.findOne({ $or: [{ email : userNameOrEmail}, { userName:userNameOrEmail }] });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            (req as AuthenticatedRequest).user = user;
            next();
        } catch (error:any) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }

    isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.session.user?.id;
            if (!userId) {
                return res.status(401).json({ message: 'User not logged in' });
            }
            // Check if user exists and has a valid token
            const user = await UserModel.findById(userId);
            if (!user || !user.token) {
                return res.status(401).json({ message: 'User not logged in' });
            }
            (req as AuthenticatedRequest).user = user;
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }

   

    public async logout(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.session.user?.id;
            if (!userId) {
                return res.status(400).json({ message: "No user logged in" });
            }

            await UserModel.findByIdAndUpdate(userId, {
                $unset: { token: "" }, // Assuming you store tokens in the user document
            });

            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ message: "Failed to logout" });
                }
                res.clearCookie("connect.sid"); // Clear session cookie
                res.clearCookie("token"); // Clear refresh token cookie if applicable
                res.status(200).json({ message: "User logged out successfully" });
            });
        } catch (error) {
            console.error("Logout error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public isAdmin(req: Request, res: Response, next: NextFunction) {
        const user = (req as AuthenticatedRequest).user;
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        next();
    }
    
}

