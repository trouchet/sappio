import { validationResult } from 'express-validator';

// Finds the validation errors in this request and wraps them in an object with handy functions
const validateRequest = (req, res, invalid_code) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(invalid_code).json({
      errors: errors.array(),
    });
  }
};

export default validateRequest;
