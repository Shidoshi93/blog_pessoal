import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../entities/user.entity';
import { CrudRepositoryContract } from '../../common/interfaces/crudRepositoryContract';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController implements CrudRepositoryContract<User> {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: number): Promise<User> {
    return await this.userService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/email/:email')
  @HttpCode(HttpStatus.OK)
  async findByEmail(@Param('email') email: string): Promise<User> {
    return await this.userService.findByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/username/:username')
  @HttpCode(HttpStatus.OK)
  async findByUsername(@Param('username') username: string): Promise<User[]> {
    return await this.userService.findByUsername(username);
  }

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() usuario: User): Promise<User> {
    return await this.userService.create(usuario);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() usuario: User): Promise<User> {
    return await this.userService.update(usuario);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.userService.delete(id);
  }
}
