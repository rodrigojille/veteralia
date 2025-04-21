import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VetProfile } from './vet-profile.entity';
import { User } from '../users/user.entity';

@Injectable()
export class VetProfileService {
  constructor(
    @InjectRepository(VetProfile)
    private readonly vetProfileRepo: Repository<VetProfile>,
  ) {}

  async createOrUpdate(user: User, data: Partial<VetProfile>) {
  try {
    let profile = await this.vetProfileRepo.createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getOne();
    if (!profile) {
      profile = this.vetProfileRepo.create({ ...data, user });
    } else {
      Object.assign(profile, data);
    }
    return await this.vetProfileRepo.save(profile);
  } catch (err) {
    console.error('VetProfile createOrUpdate error:', err);
    throw err;
  }
}

  async findByUserId(userId: string) {
    return this.vetProfileRepo.createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('user.id = :userId', { userId })
      .getOne();
  }

  async findAllPendingApproval() {
    return this.vetProfileRepo.find({ where: { approved: false } });
  }

  async approveProfile(id: string) {
    const profile = await this.vetProfileRepo.findOneBy({ id });
    if (!profile) throw new Error('Profile not found');
    profile.approved = true;
    return this.vetProfileRepo.save(profile);
  }

  async getAnalytics() {
    // Total profiles
    const total = await this.vetProfileRepo.count();
    // Pending profiles
    const pending = await this.vetProfileRepo.count({ where: { approved: false } });
    // Approved profiles
    const approved = await this.vetProfileRepo.count({ where: { approved: true } });
    // Approval rate
    const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0;
    // Profiles created per month (last 6 months)
    const raw = await this.vetProfileRepo.query(`
      SELECT TO_CHAR("createdAt", 'YYYY-MM') as month, COUNT(*) as count
      FROM vet_profile
      GROUP BY month
      ORDER BY month DESC
      LIMIT 6
    `);
    const perMonth = raw.reverse();
    return { total, pending, approved, approvalRate, perMonth };
  }
}
