// ...rest of the initial code omitted for simplicity.
import { AxiosResponse } from 'axios';
import { NextFunction } from 'express';
import { validationResult } from 'express-validator';

const validate = (req: any, res: any, next: NextFunction) => {
    const errors = validationResult(req);
  
  
    if (!errors.isEmpty()) return res.status(400).json({
      message: errors.array()[0].msg
    });
  
    next();
  };

export default {validate};