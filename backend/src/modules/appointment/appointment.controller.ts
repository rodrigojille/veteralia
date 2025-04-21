import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('appointments')
@UseGuards(AuthGuard('jwt'))
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  async getMyAppointments(@Req() req: Request) {
    const user: any = req.user;
    return this.appointmentService.findAllForOwner(user.id);
  }

  @Post()
  async createAppointment(@Req() req: Request, @Body() data: any) {
    const user: any = req.user;
    return this.appointmentService.create(user, data.petId, data.vetId, data);
  }

  @Patch(':id')
  async updateAppointment(@Req() req: Request, @Param('id') id: string, @Body() data: any) {
    const user: any = req.user;
    return this.appointmentService.update(id, user.id, data);
  }

  @Delete(':id')
  async deleteAppointment(@Req() req: Request, @Param('id') id: string) {
    const user: any = req.user;
    return this.appointmentService.remove(id, user.id);
  }
}
