import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin/audit-log')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async getRecent(@Query('limit') limit = 10) {
    return this.auditLogService.getRecent(Number(limit));
  }
}
