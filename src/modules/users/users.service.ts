import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas';
import { RegisterDto } from './dto';
import { EmailIsTakenError } from './errors';

@Injectable()
export class UsersService {
  private logger = new Logger('UserService')

  constructor(
    @InjectModel('User')
    private readonly userRepository: Model<User>) { }

  async saveUser(payload: RegisterDto) {
    const checkUser = await this._findByAttr('email', payload.email);
    if (checkUser) throw new EmailIsTakenError()

    const newUser: User = await this.userRepository.create(payload)
    return await newUser.save()
  }

  async findUserByEmail(email: string): Promise<User> {
    const user: User = await this._findByAttr('email', email)
    if (!user) throw new NotFoundException(`User with email: ${email} not found`)
    return user
  }

  private async _findByAttr(attr: string, value: any): Promise<User> {
    return await this.userRepository.findOne({ [attr]: value });
  }

}
