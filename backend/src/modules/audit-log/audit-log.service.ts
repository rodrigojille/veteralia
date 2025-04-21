import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepo: Repository<AuditLog>,
  ) {}

  async log(action: string, userEmail: string, details: string) {
    const entry = this.auditLogRepo.create({ action, userEmail, details });
    return this.auditLogRepo.save(entry);
  }

  async getRecent(limit = 10) {
    return this.auditLogRepo.find({ order: { createdAt: 'DESC' }, take: limit });
  }
}
