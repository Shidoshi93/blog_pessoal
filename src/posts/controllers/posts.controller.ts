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
import { DeleteResult } from 'typeorm';
import { Posts } from '../entities/posts.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { CreatePostDto, UpdatePostDto } from '../dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createPostDto: CreatePostDto): Promise<Posts> {
    return await this.postsService.create(createPostDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Posts[]> {
    return await this.postsService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Posts | null> {
    return await this.postsService.findById(id);
  }

  @Get('/title/:title')
  @HttpCode(HttpStatus.OK)
  async findAllByTitle(@Param('title') title: string): Promise<Posts[]> {
    return await this.postsService.fetchPostsByTitle(title);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto): Promise<Posts> {
    return await this.postsService.update(id, updatePostDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.postsService.delete(id);
  }
}
