import {Request, Response} from 'express'
import HTTP_STATUS, { StatusCodes } from 'http-status-codes'

export class Categories  {
    public async fetchCategories(req: Request, res:Response) {

        res.status(StatusCodes.OK).json({message: "categories returned well"})
    }
}