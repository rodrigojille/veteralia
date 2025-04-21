import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { PetService } from './pet.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('pets')
@UseGuards(AuthGuard('jwt'))
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get()
  async getMyPets(@Req() req: Request) {
    const user: any = req.user;
    return this.petService.findAllByOwner(user.id);
  }

  @Get(':id')
  async getPet(@Req() req: Request, @Param('id') id: string) {
    const user: any = req.user;
    return this.petService.findOneById(id, user.id);
  }

  @Post()
  async createPet(@Req() req: Request, @Body() data: any) {
    const user: any = req.user;
    return this.petService.create(user, data);
  }

  @Patch(':id')
  async updatePet(@Req() req: Request, @Param('id') id: string, @Body() data: any) {
    const user: any = req.user;
    return this.petService.update(id, user.id, data);
  }

  @Delete(':id')
  async deletePet(@Req() req: Request, @Param('id') id: string) {
    const user: any = req.user;
    return this.petService.remove(id, user.id);
  }
}
