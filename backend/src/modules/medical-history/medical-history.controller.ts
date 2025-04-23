import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class MedicalHistoryController {
  constructor(private readonly service: MedicalHistoryService) {}

  @Get('pets/:petId/medical-history')
  async getAll(@Param('petId') petId: string) {
    return this.service.findAllByPet(petId);
  }

  @Post('pets/:petId/medical-history')
  async create(@Param('petId') petId: string, @Body() data: any) {
    return this.service.create(petId, data);
  }

  @Patch('medical-history/:eventId')
  async update(@Param('eventId') eventId: string, @Body() data: any) {
    return this.service.update(eventId, data);
  }

  @Delete('medical-history/:eventId')
  async remove(@Param('eventId') eventId: string) {
    return this.service.remove(eventId);
  }
}
