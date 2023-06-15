import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as randomatic from 'randomatic';
import { RegisterDto } from 'src/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async register(body: RegisterDto) {
    const { email, password, roles } = body;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(body.password)) {
      throw new UnauthorizedException(
        'password must include both uppercase and lowercase characters and special characters',
      );
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const secret = await randomatic('Aa0', 20);
    try {
      const user = await this.usersRepository.create({
        email,
        hashedPassword,
        salt,
        secret,
        roles,
      });
      return {
        message: 'Register successfully',
        user: user,
      };
    } catch (error) {
      return error;
    }
  }
}
