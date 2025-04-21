import { Controller, Get, Query, UseGuards, Req, Patch, Body } from '@nestjs/common';
import { Request } from 'express';

interface AuthRequest extends Request {
  user?: { id: string };
}
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  @Get('me')
  async getMe(@Req() req: AuthRequest) {
    if (!req.user || !req.user.id) {
      return { message: 'User not authenticated' };
    }
    const user = await this.userRepo.findOne({ where: { id: req.user.id } });
    if (!user) return { message: 'User not found' };
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      language: user.language,
    };
  }

  @Patch('me')
  async updateMe(@Req() req: AuthRequest, @Body() body: Partial<User>) {
    if (!req.user || !req.user.id) {
      return { message: 'User not authenticated' };
    }
    const user = await this.userRepo.findOne({ where: { id: req.user.id } });
    if (!user) return { message: 'User not found' };

    // Update allowed fields
    if (body.name !== undefined) user.name = body.name;
    if (body.email !== undefined) user.email = body.email;
    if (body.phone !== undefined) user.phone = body.phone;

    await this.userRepo.save(user);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      language: user.language,
    };
  }

  @Get()
  async findAll(@Query('role') role?: string) {
    if (role === 'veterinarian') {
      // Join User with VetProfile to include specialty, language, and schedule
      const qb = this.userRepo.createQueryBuilder('user')
        .leftJoinAndSelect('user.vetProfile', 'profile')
        .where('user.role = :role', { role: 'veterinarian' });
      const users = await qb.getMany();
      // Map to include specialty, language, and availability (basic example)
      return users.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        language: user.language,
        specialty: user.vetProfile?.specialty || '',
        available: !!user.vetProfile?.schedule, // true if schedule exists
        schedule: user.vetProfile?.schedule || null,
      }));
    }
    // Default: return all users
    return this.userRepo.find();
  }
}
