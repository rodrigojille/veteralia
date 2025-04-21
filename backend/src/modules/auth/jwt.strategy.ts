import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
    console.log('JWTStrategy constructor loaded');
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
  }

  async validate(payload: any) {
    console.log('JWTStrategy.validate called');
    console.log('JWT validate payload:', payload);
    const user = await this.userRepository.findOne({ where: { id: payload.sub } });
    console.log('JWT validate user:', user);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}

