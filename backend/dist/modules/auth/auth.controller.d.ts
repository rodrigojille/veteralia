import { Request } from 'express';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    testJwt(req: Request): {
        message: string;
        user: Express.User | undefined;
    };
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: "pet_owner" | "veterinarian" | "secretary" | "admin";
            language: "es" | "en";
        };
    }>;
}
