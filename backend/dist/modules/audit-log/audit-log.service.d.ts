import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';
export declare class AuditLogService {
    private readonly auditLogRepo;
    constructor(auditLogRepo: Repository<AuditLog>);
    log(action: string, userEmail: string, details: string): Promise<AuditLog>;
    getRecent(limit?: number): Promise<AuditLog[]>;
}
