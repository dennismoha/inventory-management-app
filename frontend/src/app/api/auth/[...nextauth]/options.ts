//import { NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
//type NextAuthOptionsCallback = (req: NextApiRequest, res: NextApiResponse) => NextAuthOptions

import axios from 'axios';

export interface AuthPayload {
  // userId: string;
  email: string;
  username: string;
  role: 'admin' | 'user';
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email:',
          type: 'text',
          placeholder: 'Enter your email'
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'Enter password'
        }
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            // `https://inventory-management-app-arkv.onrender.com/api/v1/login`,
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,

            {
              email: credentials?.email,
              password: credentials?.password
            }
          );

          if (response.data) {
            return response.data;
          } else {
            return null;
          }
        } catch (error) {
          // In case of network issues or server errors, you can log it and return null
          console.error('Error during login: ', error);
          return null;
        }
      }
    })
  ],

  // Callbacks to handle JWT and Session data
  callbacks: {
    async jwt({ token, user }) {
      // Save user details (email, username, role) to the JWT token
      if (user) {
        // Save user details (email, username, role) to the JWT token
        // token.email = user.email;
        console.log('user is ', user);

        token.role = user.role;
      }
      return token;
    },
    // using the role in client component
    async session({ session, token }) {
      console.log('Session callback reached');
      console.log('Token in session callback: ', token); // Check the token structure
      console.log('session is ', session);
      if (session?.user) session.user.role = token.role;
      return session;
    }
  }
};

// export const options: NextAuthOptions =  {

// };
