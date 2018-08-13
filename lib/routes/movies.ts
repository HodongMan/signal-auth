import { Request, Response, NextFunction} from 'express';
import { Router } from 'express';
import { User } from '../models/User';

export const movies = Router();

movies.get('', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    res.json(await User.findAll());
  } catch (e) {
    next(e);
  }
});