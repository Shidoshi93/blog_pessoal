import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { ThemeModule } from './theme/theme.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { ProdService } from './data/services/prod.service';
import { DevService } from './data/services/dev.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      useClass: process.env.NODE_ENV === 'production'
        ? ProdService
        : DevService,
      imports: [ConfigModule],
    }),
    PostsModule,
    ThemeModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    // Enable ClassSerializerInterceptor globally because we are using @Exclude in User entity
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
