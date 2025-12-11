import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../bcrypt/bcrypt';
import { User } from '../../user/entities/user.entity';
import { LoginResponse, ValidateUserResponse } from '../types/auth.types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidateUserResponse> {
    this.logger.log(`Validating credentials for email: ${email}`);
    let user: User;
    let passwordMatch: boolean;

    try {
      user = await this.userService.findByEmail(email);
      passwordMatch = await this.bcryptService.comparePassword(
        password,
        user.password,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Error finding user by email: ${email}`, errorMessage);
      throw new InternalServerErrorException(
        `Error validating user credentials for email: ${email}`,
      );
    }

    if (!user || !passwordMatch) {
      this.logger.warn(`Validation failed for email: ${email}`);
      throw new HttpException('Invalid credentials.', HttpStatus.BAD_REQUEST);
    }

    // Removes password before returning user data
    const userResponse = { ...user };
    delete (userResponse as Partial<User>).password;

    return userResponse;
  }

  async login(email: string): Promise<LoginResponse> {
    this.logger.log(`Logging in user with email: ${email}`);
    const user = await this.userService.findByEmail(email);

    return {
      username: user?.username,
      id: user.id,
      email: user.email,
      token: `Bearer ${this.jwtService.sign({ id: user.id, username: user.username, email: user.email })}`,
    };
  }
}
