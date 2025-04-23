import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // Example: find user by id
  async findById(id: string): Promise<User | undefined> {
    return (await this.userRepo.findOne({ where: { id } })) ?? undefined;
  }

  // Add more production-grade methods as needed
}
