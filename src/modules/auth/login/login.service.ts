import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/common/dtos/auth.dto.ts/login.request.dto';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class LoginService {
    constructor(@InjectRepository(User)
    private userRepo: Repository<User>,
        private jwtService: JwtService) { }
    async login(data: LoginDto ) {
        const { email, password } = data
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user || !(await user.validatePassword(password))) {
            throw new UnauthorizedException();
        }
        if (!user.isActive) {
            throw new UnauthorizedException('Account is deactivated');
        }
        user.lastLoginAt = new Date()
        await this.userRepo.save(user);
        const payload = { sub: user.id, email: user.email };
        const  access_token = await this.jwtService.signAsync(payload)  
        return access_token
    }
}
