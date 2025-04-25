import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PetService } from '../pet/pet.service';
import { Roles } from '../auth/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VetProfile } from '../vet-profile/vet-profile.entity';

@Controller('admin/analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminAnalyticsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly petService: PetService,
    @InjectRepository(VetProfile)
    private readonly vetProfileRepo: Repository<VetProfile>,
  ) {}

  @Get()
  async getAnalytics() {
    // Count users by role
    const totalUsers = await this.usersService.countAll();
    const totalVets = await this.usersService.countByRole('veterinarian');
    const totalPetOwners = await this.usersService.countByRole('pet_owner');
    const totalSecretaries = await this.usersService.countByRole('secretary');
    const totalAdmins = await this.usersService.countByRole('admin');
    // Count pets
    const totalPets = await this.petService.countAll();

    // Vet profile analytics
    const totalProfiles = await this.vetProfileRepo.count();
    const approved = await this.vetProfileRepo.count({ where: { approved: true } });
    const approvalRate = totalProfiles > 0 ? Math.round((approved / totalProfiles) * 100) : 0;
    // Per month
    const perMonth = await this.vetProfileRepo.query(`
      SELECT TO_CHAR("createdAt", 'YYYY-MM') AS month, COUNT(*)::int AS count
      FROM vet_profile
      GROUP BY month
      ORDER BY month
    `);

    return {
      totalUsers,
      totalVets,
      totalPetOwners,
      totalSecretaries,
      totalAdmins,
      totalPets,
      approved,
      approvalRate,
      perMonth,
    };
  }
}
