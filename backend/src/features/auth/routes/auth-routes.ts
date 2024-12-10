import express, {Router} from 'express';
import { Signup } from '@src/features/auth/controller/signup';


class SignupRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.post('/signup', Signup.prototype.createUsers);
       

        return this.router;
    }
}

export const signupRoutes: SignupRoutes = new SignupRoutes();