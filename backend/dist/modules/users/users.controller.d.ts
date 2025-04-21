import { Request } from 'express';
interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}
import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersController {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    getMe(req: AuthRequest): Promise<{
        message: string;
        id?: undefined;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        role?: undefined;
        language?: undefined;
    } | {
        id: string;
        name: string;
        email: string;
        phone: string;
        role: "pet_owner" | "veterinarian" | "secretary" | "admin";
        language: "es" | "en";
        message?: undefined;
    }>;
    updateMe(req: AuthRequest, body: Partial<User>): Promise<{
        message: string;
        id?: undefined;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        role?: undefined;
        language?: undefined;
    } | {
        id: string;
        name: string;
        email: string;
        phone: string;
        role: "pet_owner" | "veterinarian" | "secretary" | "admin";
        language: "es" | "en";
        message?: undefined;
    }>;
    findAll(role?: string): Promise<User[] | {
        id: any;
        name: any;
        email: any;
        language: any;
        specialty: any;
        available: boolean;
        schedule: any;
    }[]>;
}
export {};
