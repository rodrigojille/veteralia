import { Controller, Get, UseGuards } from '@nestjs/common';
import { VetProfileService } from './vet-profile.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('vet-profile')
export class VetProfileAnalyticsController {
  constructor(private readonly vetProfileService: VetProfileService) {}

  // Admin: get analytics for vet profiles
  @UseGuards(AuthGuard('jwt'))
  @Get('analytics')
  async getAnalytics() {
    return this.vetProfileService.getAnalytics();
  }
}
