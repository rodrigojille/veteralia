import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { VetProfile } from '../vet-profile/vet-profile.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly vetProfileRepository;
    constructor(userRepository: Repository<User>, vetProfileRepository: Repository<VetProfile>);
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
