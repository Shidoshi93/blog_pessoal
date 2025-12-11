import { forwardRef, Module } from '@nestjs/common';
import { BcryptService } from './bcrypt/bcrypt';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(
            configService.get<string>('JWT_EXPIRES_IN') || '3600',
            10,
          ),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [BcryptService, AuthService, LocalStrategy, JwtStrategy],
  exports: [BcryptService],
})
export class AuthModule {}
