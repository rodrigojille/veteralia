import { AuditLogService } from './audit-log.service';
export declare class AuditLogController {
    private readonly auditLogService;
    constructor(auditLogService: AuditLogService);
    getRecent(limit?: number): Promise<import("./audit-log.entity").AuditLog[]>;
}
