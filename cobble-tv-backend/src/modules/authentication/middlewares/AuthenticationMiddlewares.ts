import { NextFunction, Request, Response } from "express";
import {BadRequestError} from "../../../utils/http/AppError";
import {SignInCredentialsSchema} from "../entities/SignInCredentialsEntity";



export const validateSignInCredentials = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validation = SignInCredentialsSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = validation.error.errors[0].message;
    const error = new BadRequestError(errorMessage); // Use custom error class or return directly
    return res.status(error.statusCode).json({ message: error.message });
  }
  next();
};