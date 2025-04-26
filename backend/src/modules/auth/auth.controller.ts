import { Controller, Post, Body, ValidationPipe, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {


  @UseGuards(AuthGuard('jwt'))
  @Get('test-jwt')
  testJwt(@Req() req: Request) {
    console.log('HEADERS RECEIVED:', req.headers);
    console.log('testJwt endpoint called, req.user:', req.user);
    return { message: 'JWT guard works', user: req.user };
  }
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body(new ValidationPipe()) signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('verify-email')
  async verifyEmail(@Body('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body(new ValidationPipe()) body: { email: string }) {
    return this.authService.requestPasswordReset(body.email);
  }

  @Post('reset-password')
  async resetPassword(@Body(new ValidationPipe()) body: { token: string, newPassword: string }) {
    return this.authService.resetPassword(body.token, body.newPassword);
  }

  @Post('resend-verification-email')
  async resendVerificationEmail(@Body(new ValidationPipe()) body: { email: string }) {
    return this.authService.resendVerificationEmail(body.email);
  }
}
