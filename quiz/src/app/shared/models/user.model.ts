export interface IUser {
    _id?: string;
    userName: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    profilePic: string;
    token?: string;
  }
  
  export const MOCK_USERS: IUser[] = [
    {
      _id: '1',
      userName: 'john_doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'user',
      profilePic: 'path/to/profile.jpg'
    },
    {
      _id: '2',
      userName: 'jane_smith',
      email: 'jane.smith@example.com',
      password: 'securePassword',
      role: 'admin',
      profilePic: 'path/to/profile.jpg'
    }
  ];
  