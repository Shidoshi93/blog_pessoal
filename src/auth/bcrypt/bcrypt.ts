import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class BcryptService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;

    try {
      return await hash(password, saltRounds);
    } catch (error) {
      Logger.error('Error hashing password:', error);
      throw new InternalServerErrorException('Error hashing password');
    }
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await compare(password, hashedPassword);
    } catch (error) {
      Logger.error('Error comparing password:', error);
      throw new InternalServerErrorException('Error comparing password');
    }
  }
}
