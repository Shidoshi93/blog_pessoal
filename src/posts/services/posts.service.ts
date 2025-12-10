import { 
    Injectable, 
    InternalServerErrorException, 
    Logger, 
    NotFoundException 
} from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Posts } from "../entities/posts.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ThemeService } from "../../theme/service/theme.service";
import { CrudRepositoryContract } from "../../common/interfaces/crudRepositoryContract";

@Injectable()
export class PostsService implements CrudRepositoryContract<Posts> {
    private readonly logger = new Logger(PostsService.name);

    constructor(
        @InjectRepository(Posts)
        private readonly postsRepository: Repository<Posts>,
        private readonly temaService: ThemeService,
    ) {}

    async create(post: Posts): Promise<Posts> {
        this.logger.log('Creating a new post.');

        try {
            await this.temaService.findById(post.theme.id);
            const createdPostagem = await this.postsRepository.save(post);
            this.logger.log(`Post with ID ${createdPostagem.id} created successfully.`);

            return createdPostagem;
        } catch (error) {
            this.logger.error('Error creating post:', error.message);
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
                    user: true
                }
            });
        } catch (error) {
            this.logger.error('Error fetching posts:', error.message);
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
                    user: true
                }
             });
        } catch (error) {
            this.logger.error(`Erro ao buscar postagem com ID ${id}:`, error.message);
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
                    title: ILike(`%${title}%`)
                },
                relations: { 
                    theme: true,
                    user: true
                }
            });
        } catch (error) {
            this.logger.error(`Error fetching posts with title '${title}':`, error.message);
            throw new InternalServerErrorException('Error fetching posts by title.');
        }

        if (posts.length === 0) {
            this.logger.log(`No posts found with title containing '${title}'.`);
        }

        return posts;
    }

    async update(post: Posts): Promise<Posts> {
        this.logger.log(`Updating post with ID ${post.id}.`);

        try {
            await this.findById(post.id);
            await this.temaService.findById(post.theme.id);

            const updatedPost = await this.postsRepository.save(post);
            this.logger.log(`Post with ID ${post.id} updated successfully.`);

            return updatedPost;
        } catch (error) {
            this.logger.error(`Error updating post with ID ${post.id}:`, error.message);
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
        } catch (error) {
            this.logger.error(`Error deleting post with ID ${id}:`, error.message);
            throw new InternalServerErrorException('Error deleting post.');
        }
    }
}