// src/types/user.ts



declare global {
    namespace Express {
        interface Request {
            currentUser?: AuthPayload
        }
    }
}

export interface UserInterface {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user';  // Ensuring the role can only be 'admin' or 'user'
  }
  
  export interface CreateUserRequest {
    users: UserInterface[];
  }

  export interface AuthPayload {
    // userId: string;   
    email: string;
    username: string;
    role: 'admin' | 'user';
  }