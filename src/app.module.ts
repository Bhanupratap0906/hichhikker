import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './common/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.ORM_HOST,
    port: parseInt(process.env.ORM_PORT || '5432'),
    username: process.env.ORM_USER,
    password: process.env.ORM_PASSWORD,
    database: process.env.ORM_DB,
    entities: [User],
    synchronize: true,
  }),
  JwtModule.register({
    global: true,
    secret: 'shaktiman',
    signOptions: { expiresIn: '1hr' },
  }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
