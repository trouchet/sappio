import { body, validationResult } from 'express-validator';

// Finds the validation errors in this request and wraps them in an object with handy functions
export const validateRequest = (req, invalid_code) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(invalid_code).json({
      errors: errors.array(),
    });
  }
};
