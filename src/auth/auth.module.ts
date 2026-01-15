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
      useFactory: (configService: ConfigService) => {
                const jwtSecret = configService.get<string>('JWT_SECRET');
                const jwtExpires = configService.get<string>('JWT_EXPIRES_IN') || '3h';
                return {
                    secret: jwtSecret,
                    signOptions: {
                        expiresIn: jwtExpires,
                    },
                } as any;
            },
    }),
  ],
  controllers: [AuthController],
  providers: [BcryptService, AuthService, LocalStrategy, JwtStrategy],
  exports: [BcryptService],
})
export class AuthModule {}
