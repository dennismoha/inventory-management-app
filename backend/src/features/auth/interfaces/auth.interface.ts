// src/types/user.ts

export interface UserInterface {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user';  // Ensuring the role can only be 'admin' or 'user'
  }
  
  export interface CreateUserRequest {
    users: UserInterface[];
  }