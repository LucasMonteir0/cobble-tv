import { NextFunction, Request, Response } from "express";
import {CreateUserSchema} from "../entities/CreateUserEntity";
import {BadRequestError} from "../../../utils/http/AppError";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validation = CreateUserSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = validation.error.errors[0].message;
    const error = new BadRequestError(errorMessage); // Use custom error class or return directly
    return res.status(error.statusCode).json({ message: error.message });
  }
  next();
};