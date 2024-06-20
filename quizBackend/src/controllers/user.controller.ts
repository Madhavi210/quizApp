
import { Request, Response } from 'express';
import { controller, httpGet, httpDelete, httpPost, request, response, httpPut } from 'inversify-express-utils';
import { injectable } from 'inversify';
import {  inject } from 'inversify';
import { IUserService, UserService } from '../services/user.service';
import { IUser } from '../interfaces/IUser';
import { TYPES } from '../config/types';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { promises } from 'dns';
import { DeleteResult } from 'mongodb'; // Import DeleteResult
import { log } from 'console';

interface IuserController {
    createUser(req:Request, res:Response) : Promise<void>;
    findByIdUser(id: string): Promise<IUser | null>;
    findAllUser(): Promise<IUser[]>;
    updateUser(id: string, userData: IUser): Promise<IUser | null>;
    deleteUser(id: string): Promise<boolean>;
    deleteAll() : Promise<DeleteResult>;
}

@controller('/users')
export class UserController  {
    constructor(
        @inject(TYPES.UserService) private readonly userService: IUserService , 
        @inject(TYPES.AuthMiddleware) private  readonly authMiddleware: AuthMiddleware
    ){}

    @httpPost('/login')
    async login(@request() req: Request, @response() res: Response) {
           try {
            const { userNameOrEmail, password } = req.body;
            const token = await this.userService.loginUser({ userNameOrEmail, password }, req);
            if (!token) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }
            res.cookie("token", token, { httpOnly: true });
            res.status(200).json({ message: "Login successful" , token});
           } catch (error:any) {
            res.status(500).json({ message: "Server error" });
           }
    }

    @httpPost('/logout')
    async logout(@request() req: Request, @response() res: Response) {
        this.authMiddleware.isLoggedIn(req, res, async () => {
            await this.authMiddleware.logout(req, res);
        });
    }

    @httpGet('/profile')
    async getProfile(@request() req: Request, @response() res: Response) {
        this.authMiddleware.isLoggedIn(req, res, () => {
            const user = (req as any).user;
            res.status(200).json({ user });
        });
    }

    @httpGet('/adminOnly')
    async adminOnly(@request() req: Request, @response() res: Response) {
        this.authMiddleware.isLoggedIn(req, res, () => {
            this.authMiddleware.isAdmin(req, res, () => {
                res.status(200).json({ message: 'Admin access granted' });
            });
        });
    }

    @httpGet('/')
    async getAllUser(req: Request,  res: Response): Promise<void> {
        try {
            const users = await this.userService.findAllUser();
            res.status(200).json(users); // Send the fetched users in the response
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }

    @httpGet('/:id')
    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const user = await this.userService.findByIdUser(id);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.status(200).json(user); // Send the fetched user in the response
            }
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }

    @httpPost('/')
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { userName, email, password, role, profilePic }: IUser = req.body;
            const userData: IUser = { userName, email,password, role, profilePic };
            const newUser = await this.userService.createUser(userData);
            res.status(201).json(newUser); // Send the created user in the response
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }

    @httpDelete('/:id')
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const deleted = await this.userService.deleteUser(id);
            if (deleted) {
                res.status(200).json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }

    @httpPut('edit/:id')
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            console.log("upppp ");
            
            const id = req.params.id;
            const userData: IUser = req.body;
            console.log(userData);
            
            const updatedUser = await this.userService.updateUser(id, userData);
            console.log(updatedUser);
            
            if (updatedUser) {
                res.status(200).json(updatedUser); // Send the updated user in the response
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }

    @httpDelete('/')
    async deleteAll(req:Request, res:Response): Promise<void> {
        try {
            const deletedUser = await this.userService.deleteAll()
            res.status(200).json({message: `user deleted cuccessfully: ${deletedUser}`})
        } catch (error:any) {
            res.status(500).json({error: error.message})
        }
    }

}