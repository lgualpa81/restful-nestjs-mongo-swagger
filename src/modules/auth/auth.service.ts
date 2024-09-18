import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@/modules/users/users.service';
import { compareHashedText, hashText } from '@/shared/helpers';
import { LoginDto, RegisterDto } from './dto';
import { User } from '../users/schemas';

@Injectable()
export class AuthService {
  constructor(    
    private readonly usersSvc: UsersService,
    private readonly jwtSvc: JwtService) { }

  async register(payload: RegisterDto) {    
    const newUser = await this.usersSvc.saveUser({
      ...payload,
      password: await hashText(payload.password)
    })
    return this.generateToken(newUser)
  }

  async login(payload: LoginDto) {
    const { email, password } = payload
    const user = await this.usersSvc.findUserByEmail(email)
    const checkPassword: boolean = await compareHashedText(password, user.password)
    if (!user || !checkPassword) throw new UnauthorizedException(`Invalid credentials`)
    return this.generateToken(user)
  }

  private generateToken(user: User) {
    const token = {
      sub: user._id,
      roles: user.role
    }
    return {
      accessToken: this.jwtSvc.sign(token)
    }
  }


}
