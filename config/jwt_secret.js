import dotenv from 'dotenv'

dotenv.config('./.env');

export const jwt_secret = process.env.JWT_KEY || '1234';
