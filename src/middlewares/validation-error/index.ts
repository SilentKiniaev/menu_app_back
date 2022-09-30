import { Request, Response, NextFunction } from "express";
import {
  validationResult,
  ErrorFormatter,
  ValidationError,
} from "express-validator";

export const validateError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorFormatter: ErrorFormatter<string> = ({
    location,
    msg,
    param,
  }: ValidationError) => {
    return `${location}[${param}]: ${msg}`;
  };

  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
