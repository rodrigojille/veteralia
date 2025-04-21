import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { VetProfile } from '../vet-profile/vet-profile.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(VetProfile)
    private readonly vetProfileRepository: Repository<VetProfile>,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password, name, role, language } = signupDto;
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) throw new ConflictException('Email already registered');
    const hash = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hash, name, role, language });
    await this.userRepository.save(user);

    // If veterinarian, create VetProfile
    if (role === 'veterinarian') {
      const vetProfile = this.vetProfileRepository.create({
        user,
        specialty: signupDto.specialty || '',
        location: signupDto.location || '',
        pricingTier: signupDto.pricingTier || 'basic',
        approved: false,
        schedule: null,
      });
      await this.vetProfileRepository.save(vetProfile);
    }
    return { message: 'Signup successful' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    console.log('[AUTH] Login attempt:', email);
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      console.log('[AUTH] User not found for email:', email);
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log('[AUTH] User found:', user.email, 'Role:', user.role);
    const valid = await bcrypt.compare(password, user.password);
    console.log('[AUTH] Password valid?', valid);
    if (!valid) {
      console.log('[AUTH] Invalid password for:', email);
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d',
    });
    console.log('[AUTH] Login success, token issued for:', email);
    return { access_token: token, user: { id: user.id, email: user.email, name: user.name, role: user.role, language: user.language } };
  }
}
