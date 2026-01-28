import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request?.cookies?.jwt;
    if (!token || token === 'null' || token === 'undefined') {
      throw new NotFoundException('Need to be logged in');
    }
    const payload = this.jwtService.verify(token);
    const user = await this.userRepo.findOne({ where: { id: payload.sub } });
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      request.userId = user.id;
      return true;
    }
  }
}
