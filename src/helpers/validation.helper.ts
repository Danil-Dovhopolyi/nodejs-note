import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

export const validateCreateNote = (req: Request, res: Response, next: NextFunction) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    date: yup.string().required(),
    category: yup.string().required(),
    content: yup.string().required(),
  });

  try {
    schema.validateSync(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const validateEditNote = (req: Request, res: Response, next: NextFunction) => {
  const schema = yup.object().shape({
    name: yup.string(),
    date: yup.string(),
    category: yup.string(),
    content: yup.string(),
  });

  try {
    schema.validateSync(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
