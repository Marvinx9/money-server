import { Request } from 'express';
import { User } from './currentUser.interface';

export interface AuthRequest extends Request {
    user: User;
}
