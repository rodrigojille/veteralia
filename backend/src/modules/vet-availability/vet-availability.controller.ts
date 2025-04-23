import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { VetAvailabilityService } from './vet-availability.service';
import { CreateVetAvailabilityDto } from './dto/create-vet-availability.dto';
import { UpdateVetAvailabilityDto } from './dto/update-vet-availability.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('vet-availability')
@UseGuards(AuthGuard('jwt'))
export class VetAvailabilityController {
  constructor(private readonly service: VetAvailabilityService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.service.findAllForVet(req.user.id);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateVetAvailabilityDto) {
    return this.service.create(req.user.id, dto);
  }

  @Put(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateVetAvailabilityDto) {
    return this.service.update(req.user.id, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.service.remove(req.user.id, id);
  }
}
