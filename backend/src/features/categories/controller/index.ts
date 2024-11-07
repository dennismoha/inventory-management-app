import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client'; // Prisma client to interact with the database
import { joiValidation } from '@src/shared/globals/decorators/joi-validation-decorators';
import { categorySchema } from '@src/features/categories/schema/categories-schema';
import { ConflictError, NotFoundError } from '@src/shared/globals/helpers/error-handler';
import GetSuccessMessage from '@src/shared/globals/helpers/success-messages';
import { Category } from '@src/features/categories/interfaces/categories.interface';

const prisma = new PrismaClient();

export class Categories {
  public async fetchCategories(req: Request, res: Response) {
    const categories = await prisma.categories.findMany({
      include: {
        SubCategories: true, // Include related SubCategories
        Products: true // Include related Products
      }
    });

    res.status(StatusCodes.OK).json({ data: categories });
  }

  @joiValidation(categorySchema)
  public async createCategory(req: Request, res: Response): Promise<void> {
    const { category_slug, category_name, description } = req.body;

    // Check if category_slug already exists
    const existingCategory = await prisma.categories.findUnique({
      where: { category_slug }
    });

    if (existingCategory) {
      throw new ConflictError('category slug arleady exists');
      // return res.status(StatusCodes.CONFLICT).json({ message: 'Category slug already exists' });
    }

    // Create new category
    const category: Category = await prisma.categories.create({
      data: {
        category_slug,
        category_name,
        description
      }
    });

    res.status(StatusCodes.CREATED).send(GetSuccessMessage(StatusCodes.CREATED, category, 'category created succesfully'));
  }

  // Update an existing category
  @joiValidation(categorySchema)
  public async updateCategory(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params; // Assuming categoryId is in the URL path
    const { category_slug, category_name, description } = req.body;

    // Check if category exists
    const category = await prisma.categories.findUnique({
      where: { categoryId }
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    // Update category
    const updatedCategory = await prisma.categories.update({
      where: { categoryId },
      data: {
        category_slug,
        category_name,
        description
      }
    });

    res.status(StatusCodes.OK).json({ message: 'Category updated successfully', data: updatedCategory });
  }

  // Delete a category
  public async deleteCategory(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params;

    // Check if category exists
    const category = await prisma.categories.findUnique({
      where: { categoryId }
    });

    if (!category) {
      throw new NotFoundError('category not found');
    }

    // Delete category
    await prisma.categories.delete({
      where: { categoryId }
    });

    res.status(StatusCodes.NO_CONTENT).send(GetSuccessMessage(StatusCodes.NO_CONTENT, [], 'category deleted succesfully'));
  }
}
