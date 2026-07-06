import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
export const API_KEY = process.env.API_KEY;