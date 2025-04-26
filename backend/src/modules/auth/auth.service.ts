import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import * as crypto from 'crypto';
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
    private readonly notificationService: NotificationService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password, name, role, language } = signupDto;
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) throw new ConflictException('Email already registered');
    const hash = await bcrypt.hash(password, 10);
    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = this.userRepository.create({
      email,
      password: hash,
      name,
      role,
      language,
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
    });
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

    // Send verification email
    const verifyUrl = `http://localhost:3000/auth/verify-email?token=${verificationToken}`;
    const subject = 'Verifica tu correo electrónico';
    const html = `<p>Hola ${name},</p><p>Por favor verifica tu correo electrónico haciendo clic en el siguiente enlace:</p><p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
    await this.notificationService.sendEmail(email, subject, html);

    return { message: 'Signup successful. Please check your email to verify your account.' };
  }

  async verifyEmail(token: string) {
    if (!token) {
      return { message: 'Verification token is required.' };
    }
    const user = await this.userRepository.findOne({ where: { emailVerificationToken: token } });
    if (!user) {
      return { message: 'Invalid or expired verification token.' };
    }
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await this.userRepository.save(user);
    return { message: 'Email successfully verified.' };
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
    if (!user.isEmailVerified) {
      console.log('[AUTH] User email not verified:', email);
      const message =
        user.language === 'es'
          ? 'Por favor verifica tu correo electrónico antes de iniciar sesión.'
          : 'Please verify your email before logging in.';
      throw new UnauthorizedException(message);
    }
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

  async requestPasswordReset(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    // Always return success to avoid user enumeration
    if (!user) {
      return { message: 'Si el correo existe, se ha enviado un enlace para restablecer la contraseña.' };
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    (user as any).passwordResetToken = resetToken;
    await this.userRepository.save(user);
    const resetUrl = `http://localhost:3000/auth/reset-password?token=${resetToken}`;
    const subject = 'Restablece tu contraseña';
    const html = `<p>Hola ${user.name},</p><p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`;
    await this.notificationService.sendEmail(user.email, subject, html);
    return { message: 'Si el correo existe, se ha enviado un enlace para restablecer la contraseña.' };
  }

  async resetPassword(token: string, newPassword: string) {
    if (!token) {
      return { message: 'El token es requerido.' };
    }
    const user = await this.userRepository.findOne({ where: { passwordResetToken: token } });
    if (!user) {
      return { message: 'Token inválido o expirado.' };
    }
    user.password = await bcrypt.hash(newPassword, 10);
    (user as any).passwordResetToken = undefined;
    await this.userRepository.save(user);
    return { message: 'Contraseña restablecida correctamente.' };
  }

  async resendVerificationEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    // Always return success to avoid user enumeration
    if (!user || user.isEmailVerified) {
      return { message: 'Si el correo no está verificado, se ha reenviado el correo de verificación.' };
    }
    // Generate new token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = verificationToken;
    await this.userRepository.save(user);
    const verifyUrl = `http://localhost:3000/auth/verify-email?token=${verificationToken}`;
    const subject = 'Verifica tu correo electrónico';
    const html = `<p>Hola ${user.name},</p><p>Por favor verifica tu correo electrónico haciendo clic en el siguiente enlace:</p><p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
    await this.notificationService.sendEmail(user.email, subject, html);
    return { message: 'Si el correo no está verificado, se ha reenviado el correo de verificación.' };
  }
}

