import dotenv from 'dotenv';

import axios from 'axios';


dotenv.config({});


import { UserInterface } from '@src/features/auth/interfaces/auth.interface';


/**
 * Seed function to test user signup by sending a request with two users.
 * One user will be an admin and the other will be a regular user.
 */
async function seed() {
    const users: UserInterface[] =
        [
            {
                username: 'adminUser',
                email: 'admin@example.com',
                password: 'adminpassword123',
                role: 'admin',
            },
            {
                username: 'normalUser',
                email: 'user@example.com',
                password: 'userpassword123',
                role: 'user',
            },
        ];


    try {
        const response = await axios.post('http://localhost:8081/api/v1/signup', users);
        console.log('Users created:', response.data);
    } catch (e: unknown) {
        if (typeof e === 'string') {
            e.toUpperCase(); // works, `e` narrowed to string
            console.log('e', e);
        } else if (e instanceof Error) {
            console.log(e.message);

        }
    }
}

seed();
