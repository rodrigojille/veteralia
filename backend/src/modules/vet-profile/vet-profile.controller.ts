import { Controller, UseGuards, Post, Body, Req, Get, Param, Patch, Query } from '@nestjs/common';
import { VetProfileService } from './vet-profile.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('vet-profile')
export class VetProfileController {
  constructor(private readonly vetProfileService: VetProfileService) {}

  // --- PUBLIC ENDPOINTS ---
  // Paginated, searchable list of approved vets
  @Get('public')
  async publicList(
    @Query('search') search: string = '',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.vetProfileService.publicList(search, page, limit);
  }

  // Paginated, searchable list of ALL vets (approved and unapproved)
  @Get('all-public')
  async allPublicList(
    @Query('search') search: string = '',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.vetProfileService.allPublicList(search, page, limit);
  }

  // Public vet profile by vetProfile id
  @Get('public/:id')
  async publicProfile(@Param('id') id: string) {
    return this.vetProfileService.publicProfileById(id);
  }

  // Vet or secretary creates/updates their profile
  @UseGuards(AuthGuard('jwt'))
  @Post('me')
  async createOrUpdate(@Req() req: Request, @Body() data: any) {
    const user: any = req.user;
    if (!['veterinarian', 'secretary'].includes(user.role)) {
      return { statusCode: 403, message: 'Forbidden: Only veterinarians or secretaries can access this endpoint.' };
    }
    return this.vetProfileService.createOrUpdate(user, data);
  }

  // Vet or secretary gets their profile
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMyProfile(@Req() req: Request) {
    const user: any = req.user;
    if (!['veterinarian', 'secretary'].includes(user.role)) {
      return { statusCode: 403, message: 'Forbidden: Only veterinarians or secretaries can access this endpoint.' };
    }
    return this.vetProfileService.findByUserId(user.id);
  }

  // Admin: get all vet profiles (approved and unapproved)
  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getAllProfiles(@Req() req: Request) {
    const user: any = req.user;
    if (user.role !== 'admin') return { error: 'Unauthorized' };
    return this.vetProfileService.findAllProfilesWithUser();
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
