import env from './env_info.js';

export const jwt_token_string = env.JWT_KEY || '1234';
export const jwt_token_duration_ms = Number(env.JWT_TOKEN_DURATION_MS) || 3600;
