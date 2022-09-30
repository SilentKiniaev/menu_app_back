import { checkSchema, Schema } from "express-validator";

export const createMenuItemScheme: Schema = {
  title: {
    isString: true,
  },
  price: {
    isInt: true,
    toInt: true,
  },
  weight: {
    isInt: true,
    toInt: true,
  },
  protein: {
    isInt: true,
    toInt: true,
    custom: {
      options: (value, { req, location, path }) => {
        if (value + req.body.fats + req.body.carbs > 100) {
          throw new Error("Inavlid nutritions");
        }
        return value;
      },
    },
  },
  fats: {
    isInt: true,
    toInt: true,
  },
  carbs: {
    isInt: true,
    toInt: true,
  },
  description: {
    isString: true,
  },
  categoryId: {
    isInt: true,
    toInt: true,
  },
  spicy: {
    isBoolean: true,
    optional: true,
  },
};
