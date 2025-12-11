import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CrudRepositoryContract } from '../../common/interfaces/crudRepositoryContract';
import { DeleteResult } from 'typeorm';
import { Posts } from '../entities/posts.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Controller('/post')
export class PostsController implements CrudRepositoryContract<Posts> {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() newPost: Posts): Promise<Posts> {
    return await this.postsService.create(newPost);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Posts[]> {
    return await this.postsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Posts | null> {
    return await this.postsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/title/:title')
  @HttpCode(HttpStatus.OK)
  async findAllByTitle(@Param('title') title: string): Promise<Posts[]> {
    return await this.postsService.fetchPostsByTitle(title);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() updatedPost: Posts): Promise<Posts> {
    return await this.postsService.update(updatedPost);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.postsService.delete(id);
  }
}
