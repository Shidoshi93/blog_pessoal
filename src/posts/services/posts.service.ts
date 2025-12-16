import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Posts } from '../entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeService } from '../../theme/service/theme.service';
import { CreatePostDto, UpdatePostDto } from '../dtos';
import { Theme } from '../../theme/entities/theme.entity';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    private readonly temaService: ThemeService,
  ) {}

  private getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }

  async create(createPostDto: CreatePostDto): Promise<Posts> {
    this.logger.log('Creating a new post.');

    try {
      // Validar tema
      await this.temaService.findById(createPostDto.themeId);

      // Construir objeto Posts para salvar
      const newPost = new Posts();
      newPost.title = createPostDto.title;
      newPost.text = createPostDto.text;
      newPost.theme = { id: createPostDto.themeId } as Theme;
      newPost.user = { id: createPostDto.userId } as User;

      const createdPost = await this.postsRepository.save(newPost);
      this.logger.log(
        `Post with ID ${createdPost.id} created successfully.`,
      );

      return createdPost;
    } catch (error: unknown) {
      this.logger.error('Error creating post:', this.getErrorMessage(error));
      throw new InternalServerErrorException('Error creating post.');
    }
  }

  async findAll(): Promise<Posts[]> {
    this.logger.log(`Fetching all posts from the database.`);
    let posts: Posts[] = [];
    try {
      posts = await this.postsRepository.find({
        relations: {
          theme: true,
          user: true,
        },
      });
    } catch (error: unknown) {
      this.logger.error('Error fetching posts:', this.getErrorMessage(error));
      throw new InternalServerErrorException('Error fetching posts.');
    }

    if (posts.length === 0) {
      this.logger.log('No posts found in the database.');
    }

    return posts;
  }

  async findById(id: number): Promise<Posts> {
    this.logger.log(`Fetching post with ID ${id} from the database.`);
    let post: Posts | null = null;

    try {
      post = await this.postsRepository.findOne({
        where: { id },
        relations: {
          theme: true,
          user: true,
        },
      });
    } catch (error: unknown) {
      this.logger.error(
        `Erro ao buscar postagem com ID ${id}:`,
        this.getErrorMessage(error),
      );
      throw new InternalServerErrorException('Erro ao buscar postagem por ID.');
    }

    if (!post) {
      this.logger.warn(`Post with ID ${id} not found.`);
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }

    return post;
  }

  async fetchPostsByTitle(title: string): Promise<Posts[]> {
    this.logger.log(`Fetching posts with title containing '${title}'.`);
    let posts: Posts[] = [];

    try {
      posts = await this.postsRepository.find({
        where: {
          title: ILike(`%${title}%`),
        },
        relations: {
          theme: true,
          user: true,
        },
      });
    } catch (error: unknown) {
      this.logger.error(
        `Error fetching posts with title '${title}':`,
        this.getErrorMessage(error),
      );
      throw new InternalServerErrorException('Error fetching posts by title.');
    }

    if (posts.length === 0) {
      this.logger.log(`No posts found with title containing '${title}'.`);
    }

    return posts;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Posts> {
    this.logger.log(`Updating post with ID ${id}.`);

    try {
      // Buscar o post existente
      const existingPost = await this.findById(id);

      // Validar tema se foi fornecido
      if (updatePostDto.themeId) {
        await this.temaService.findById(updatePostDto.themeId);
      }

      // Fazer merge dos campos fornecidos
      const postToUpdate: Posts = {
        ...existingPost,
        ...(updatePostDto.title && { title: updatePostDto.title }),
        ...(updatePostDto.text && { text: updatePostDto.text }),
        ...(updatePostDto.themeId && { theme: { id: updatePostDto.themeId } as Theme })
      };

      const updatedPost = await this.postsRepository.save(postToUpdate);
      this.logger.log(`Post with ID ${id} updated successfully.`);

      return updatedPost;
    } catch (error: unknown) {
      this.logger.error(
        `Error updating post with ID ${id}:`,
        this.getErrorMessage(error),
      );

      if (error instanceof NotFoundException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Error updating post.');
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    this.logger.log(`Deleting post with ID ${id}.`);

    try {
      const post = await this.findById(id);
      const result = await this.postsRepository.delete(post.id);
      this.logger.log(`Post with ID ${id} deleted successfully.`);

      return result;
    } catch (error: unknown) {
      this.logger.error(
        `Error deleting post with ID ${id}:`,
        this.getErrorMessage(error),
      );
      throw new InternalServerErrorException('Error deleting post.');
    }
  }
}
