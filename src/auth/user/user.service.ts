import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signUp(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user) {
      throw new ConflictException('User with this emial already exists');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const createdUser = this.userRepository.create({
      email: email,
      password: result,
    });
    const singedInUser = await this.userRepository.save(createdUser);
    return singedInUser;
  }

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (!user) {
      throw new NotAcceptableException('User with this emial does not exist');
    }
    const [salt, userHash] = user.password.split('.');
    const newHash = (await scrypt(password, salt, 32)) as Buffer;

    if (userHash !== newHash.toString('hex')) {
      throw new BadRequestException('password inncorect');
    }
    return user;
  }
}
