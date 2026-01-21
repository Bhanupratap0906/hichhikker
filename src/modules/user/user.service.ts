import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }
    async getProfile(userId: string) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
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
