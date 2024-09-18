import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { envs } from 'src/shared/config';
import { JwtStrategy } from './strategies';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      //global: true,
      secret: envs.jwt_secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
