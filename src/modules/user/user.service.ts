import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User> ,private jwtService: JwtService) { }
    async getProfile(token: string) {
        const payload = this.jwtService.verify(token);
        const user = await this.userRepo.findOne({ where: { id: payload.sub } });
        return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            phone: user?.phoneNumber,
            createdAt: user?.createdAt,
            lastLoginAt: user?.lastLoginAt,
        };
    }
}
