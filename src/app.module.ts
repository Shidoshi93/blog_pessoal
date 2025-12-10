import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { Postagem } from './postagem/entities/postagem.entity';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/usuario.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        synchronize: configService.get<string>('NODE_ENV') === 'development',
        entities: [Postagem, Tema, Usuario],
      }),
    }),
    PostagemModule,
    TemaModule,
    UsuarioModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
