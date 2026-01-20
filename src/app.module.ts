import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './common/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'hitchhiker',
      entities: [User],
      synchronize: true,
    }),
    JwtModule.register({
            global: true,
            secret: 'shaktiman',
            signOptions: { expiresIn: '1hr' },
          }),
    UserModule , 
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
