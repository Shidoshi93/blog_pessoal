import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { Posts } from './posts/entities/posts.entity';
import { Theme } from './theme/entities/theme.entity';
import { ThemeModule } from './theme/theme.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
        type: 'sqlite' as const,
        database: ':memory:',
        entities: [Posts, Theme, User],
        synchronize: true,
        logging: false,
        dropSchema: true,
      }),
    PostsModule,
    ThemeModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    // Enable ClassSerializerInterceptor globally because we are using @Exclude in User entity
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppTestModule {}
