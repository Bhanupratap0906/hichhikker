import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User]) ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
