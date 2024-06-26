
export interface IUser {
    _id?: string;
    userName: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    profilePic: string;
    token?: string ;
}