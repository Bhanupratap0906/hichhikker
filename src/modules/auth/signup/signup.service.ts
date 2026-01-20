import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/common/dtos/auth.dto.ts/signUp.request.dto';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SignupService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }
    async signup(data: SignupDto): Promise<User> {
        const { email, password, name, phoneNumber } = data;

        const existingUser = await this.userRepo.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Email already registered');
        }

        const user = this.userRepo.create({
            email,
            password,
            name,
            phoneNumber,
        });

        try {
            return await this.userRepo.save(user);
        } catch (error) {
            throw new InternalServerErrorException('Database error during registration');
        }
    }
}
