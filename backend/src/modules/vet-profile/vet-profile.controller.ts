import { Controller, UseGuards, Post, Body, Req, Get, Param, Patch } from '@nestjs/common';
import { VetProfileService } from './vet-profile.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('vet-profile')
export class VetProfileController {
  constructor(private readonly vetProfileService: VetProfileService) {}

  // Vet or secretary creates/updates their profile
  @UseGuards(AuthGuard('jwt'))
  @Post('me')
  async createOrUpdate(@Req() req: Request, @Body() data: any) {
    // Only allow for veterinarian or secretary
    const user: any = req.user;
    if (!['veterinarian', 'secretary'].includes(user.role)) {
      return { error: 'Unauthorized' };
    }
    return this.vetProfileService.createOrUpdate(user, data);
  }

  // Vet or secretary gets their profile
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMyProfile(@Req() req: Request) {
    const user: any = req.user;
    return this.vetProfileService.findByUserId(user.id);
  }

  // Admin: get all profiles pending approval
  @UseGuards(AuthGuard('jwt'))
  @Get('pending')
  async getPending(@Req() req: Request) {
    const user: any = req.user;
    if (user.role !== 'admin') return { error: 'Unauthorized' };
    return this.vetProfileService.findAllPendingApproval();
  }

  // Admin: approve vet profile
  @UseGuards(AuthGuard('jwt'))
  @Patch('approve/:id')
  async approve(@Req() req: Request, @Param('id') id: string) {
    const user: any = req.user;
    if (user.role !== 'admin') return { error: 'Unauthorized' };
    return this.vetProfileService.approveProfile(id);
  }
}
