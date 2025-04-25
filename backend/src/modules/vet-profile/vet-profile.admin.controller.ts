import { Controller, Get, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { VetProfileService } from './vet-profile.service';
import { UsersService } from '../users/users.service';
import { AppointmentService } from '../appointment/appointment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('vet-profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class VetProfileAdminController {
  constructor(
    private readonly vetProfileService: VetProfileService,
    private readonly usersService: UsersService,
    private readonly appointmentService: AppointmentService
  ) {}

  // GET /vet-profile/analytics
  @Get('analytics')
  async getAnalytics() {
    const total = await this.vetProfileService.countAll();
    const approved = await this.vetProfileService.countApproved();
    const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0;
    const perMonth = await this.vetProfileService.countPerMonth();
    return { total, approved, approvalRate, perMonth };
  }

  // GET /vet-profile/pending
  @Get('pending')
  async getPendingProfiles() {
    return this.vetProfileService.findPending();
  }

  // PATCH /vet-profile/approve/:id
  @Patch('approve/:id')
  async approveProfile(@Param('id') id: string) {
    return this.vetProfileService.approveProfile(id);
  }
}
