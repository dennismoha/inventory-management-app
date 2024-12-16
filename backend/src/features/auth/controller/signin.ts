/*
    This will receive the user email and password from the req.body
    we will check if that user email exists in the db
    if yes, compare the password hash with the  password. because we are using bcrypt
    if password not much return an error. 
    if password match create a jwt token and store it in a cookie
    return that
*/



import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '@src/shared/prisma/prisma-client'; // Prisma client to interact with the database
import { UserInterface } from '@src/features/auth/interfaces/auth.interface';
import { BadRequestError } from '@src/shared/globals/helpers/error-handler';
import { config } from '@src/config';



export class Login {
  /**
   * Handles user login by validating email and password, and generating a JWT token if valid.
   * 
   * @param {Request} req - The Express request object containing user credentials (email and password).
   * @param {Response} res - The Express response object to send the response.
   * @returns {Promise<Response>} A promise that resolves to the response object.
   */
  public async login(req: Request, res: Response): Promise<Response> {
   
    const { email, password }: Pick<UserInterface, 'email' | 'password' > = req.body;

    // Check if user exists with the given email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
        throw new BadRequestError('Invalid email or password');
    }

    // Compare the provided password with the stored hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
     throw new BadRequestError('Invalid email or password');
    }

    // Generate a JWT token
    const token = jwt.sign(
      { email: user.email, username: user.username, role: user.role }, // Payload
      config.JWT_SECRET,             // Secret key for signing the token
      { expiresIn: '1h' }                                     // Token expiration time
    );

    req.session = {jwt: token};
 
    // Return a success message (without sending the token directly in the response body)
    return res.status(200).json({
      message: 'Login successful', token, role: user.role
    });
  }
}


