import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from "../../../src/posts/services/posts.service";
import { ThemeService } from "../../../src/theme/service/theme.service";
import { UserService } from "../../../src/user/service/user.service";
import { getRepositoryToken } from '@nestjs/typeorm';
import { Posts } from '../../../src/posts/entities/posts.entity';
import { UpdatePostDto } from '../../../src/posts/dtos/update-post.dto';
import { mockPosts } from "../../utils/post.mock.utils";


describe('PostsService', () => {
    let postService: PostsService;

    beforeEach(async () => {
        const mockThemeService = {
            findById: jest.fn().mockResolvedValue({ id: 1, descricao: 'Tema de Teste' }),
        };

        const mockUserService = {
            findById: jest.fn().mockResolvedValue({ id: 1, username: 'usuarioTeste' }),
        };

        const mockPostsRepo = {
            find: jest.fn().mockResolvedValue(mockPosts),
            findOne: jest.fn().mockResolvedValue(mockPosts[0]),
            save: jest.fn().mockImplementation((post) => Promise.resolve(post)),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
        };

        const app: TestingModule = await Test.createTestingModule({
            providers: [
                PostsService,
                { provide: getRepositoryToken(Posts), useValue: mockPostsRepo },
                { provide: ThemeService, useValue: mockThemeService },
                { provide: UserService, useValue: mockUserService },
            ],
        }).compile();

        postService = app.get<PostsService>(PostsService);
    });

    it('should be defined', () => {
        expect(postService).toBeDefined();
    });

    it('should return all posts', async () => {
        const posts = await postService.findAll();
        expect(posts.length).toBeGreaterThan(0);
        expect(posts[0].title).toBe('Postagem de Teste');
        expect(posts[0].theme.description).toBe('Tema de Teste');
        expect(posts[0].user.username).toBe('usuarioTeste');
    });

    it('should return a post by ID', async () => {
        const post = await postService.findById(1);
        expect(post).toBeDefined();
        if (post) {
            expect(post.id).toBe(1);
            expect(post.title).toBe('Postagem de Teste');
            expect(post.theme.description).toBe('Tema de Teste');
            expect(post.user.username).toBe('usuarioTeste');
        }
    });

    it('shoud throw an not found error when post not found by ID', async () => {
        try {
            await postService.findById(999);
        } catch (error) {
            expect(error.status).toBe(404);
            expect(error.message).toBe('Post with ID 999 not found.');
        }
    });

    it('should return a post by title', async () => {
        const posts = await postService.fetchPostsByTitle('Postagem de Teste');
        expect(posts.length).toBeGreaterThan(0);
        expect(posts[0].title).toBe('Postagem de Teste');
        expect(posts[0].theme.description).toBe('Tema de Teste');
        expect(posts[0].user.username).toBe('usuarioTeste');
    });

    it('shoud updade a post', async () => {
        const updatePostDto: UpdatePostDto = {
            title: 'Postagem Atualizada',
        };
        const updatedPost = await postService.update(1, updatePostDto);
        expect(updatedPost).toBeDefined();
        expect(updatedPost.title).toBe('Postagem Atualizada');
    });

    it('should update a post with multiple fields', async () => {
        const updatePostDto: UpdatePostDto = {
            title: 'Novo Título',
            text: 'Novo conteúdo',
            themeId: 2,
        };
        const updatedPost = await postService.update(1, updatePostDto);
        expect(updatedPost).toBeDefined();
        expect(updatedPost.title).toBe('Novo Título');
        expect(updatedPost.text).toBe('Novo conteúdo');
    });

    it('shoukd throw an error when updating a non-existing post', async () => {
        const updatePostDto: UpdatePostDto = {
            title: 'Título Inválido',
        };

        try {
            await postService.update(999, updatePostDto);
        } catch (error) {
            expect(error.status).toBe(404);
            expect(error.message).toBe('Post with ID 999 not found.');
        }
    });

    it('should delete a post', async () => {
        const deleteResult = await postService.delete(1);
        expect(deleteResult).toBeDefined();
        expect(deleteResult.affected).toBe(1);
    });
});