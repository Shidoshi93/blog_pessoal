import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { App } from "supertest/types";
import { AppTestModule } from "../../src/app-test.module";
import request from 'supertest';

describe('PostsController (E2E)', () => {
    let app: INestApplication<App>;
    let userId: number;
    let themeId: number;
    let token: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppTestModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const userResponse = await request(app.getHttpServer())
            .post('/user/signup')
            .send({
                username: `testuser`,
                email: `testuser@test.com`,
                password: 'TestPassword123!',
            });

        userId = userResponse.body.id;

        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: `testuser@test.com`,
                password: 'TestPassword123!',
            });

        token = loginResponse.body.token;

        const themeResponse = await request(app.getHttpServer())
            .post('/theme')
            .set('Authorization', token)
            .send({
                description: `Tema de Teste ${Date.now()}`,
                name: `Tema ${Date.now()}`,
            });

        if (themeResponse.body && themeResponse.body.id) {
            themeId = themeResponse.body.id;
        }
    });

    afterAll(async () => {
        await app.close();
    });

    it('POST /post should create a new post with valid token', async () => {
        const createPostDto = {
            title: 'Novo Post de Teste',
            text: 'Conteúdo do novo post',
            themeId: themeId,
            userId: userId,
        };

        return request(app.getHttpServer())
            .post('/post')
            .set('Authorization', token)
            .send(createPostDto)
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.title).toBe('Novo Post de Teste');
                expect(response.body.text).toBe('Conteúdo do novo post');
            });
    });

    it('GET /post should return 401 without token (duplicate test)', async () => {
        return request(app.getHttpServer())
            .get('/post')
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('GET /post should return 200 with valid token and list posts', async () => {
        return request(app.getHttpServer())
            .get('/post')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(Array.isArray(response.body)).toBe(true);
                expect(response.body.length).toBeGreaterThan(0);
                expect(response.body[0]).toHaveProperty('title');
                expect(response.body[0]).toHaveProperty('text');
                expect(response.body[0]).toHaveProperty('theme');
                expect(response.body[0]).toHaveProperty('user');
                expect(response.body[0].title).toBe('Novo Post de Teste');
            });
    });

    it('GET /post should return 401 without token', async () => {
        return request(app.getHttpServer())
            .get('/post')
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('GET /post/:id should return a post by ID with valid token', async () => {
        const postsResponse = await request(app.getHttpServer())
            .get('/post')
            .set('Authorization', token);

        const postId = postsResponse.body[0].id;

        return request(app.getHttpServer())
            .get(`/post/${postId}`)
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.id).toBe(postId);
                expect(response.body).toHaveProperty('title');
                expect(response.body).toHaveProperty('text');
            });
    });

    it('GET /post/:id should return 401 without token', async () => {
        const postsResponse = await request(app.getHttpServer())
            .get('/post')
            .set('Authorization', token);

        const postId = postsResponse.body[0].id;

        return request(app.getHttpServer())
            .get(`/post/${postId}`)
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('GET /post/title/:title should return posts by title with valid token', async () => {
        const title = 'Novo Post de Teste';

        return request(app.getHttpServer())
            .get(`/post/title/${encodeURIComponent(title)}`)
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(Array.isArray(response.body)).toBe(true);
                expect(response.body.length).toBeGreaterThan(0);
                expect(response.body[0]).toHaveProperty('title');
                expect(response.body[0].title).toBe(title);
            });
    });

    it('GET /post/title/:title should return 401 without token', async () => {
        const title = 'Novo Post de Teste';

        return request(app.getHttpServer())
            .get(`/post/title/${encodeURIComponent(title)}`)
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('PUT /post/:id should update a post with valid token', async () => {
        const postsResponse = await request(app.getHttpServer())
            .get('/post')
            .set('Authorization', token);

        const postId = postsResponse.body[0].id;

        const updatePostDto = {
            title: 'Post Atualizado de Teste',
            text: 'Conteúdo atualizado do post',
            themeId: themeId,
            userId: userId,
        };

        return request(app.getHttpServer())
            .put(`/post/${postId}`)
            .set('Authorization', token)
            .send(updatePostDto)
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.title).toBe('Post Atualizado de Teste');
                expect(response.body.text).toBe('Conteúdo atualizado do post');
            });
    });

    it('PUT /post/:id should return 401 without token', async () => {
        const postsResponse = await request(app.getHttpServer())
            .get('/post')
            .set('Authorization', token);

        const postId = postsResponse.body[0].id;

        const updatePostDto = {
            title: 'Post Atualizado de Teste',
            text: 'Conteúdo atualizado do post',
            themeId: themeId,
            userId: userId,
        };

        return request(app.getHttpServer())
            .put(`/post/${postId}`)
            .send(updatePostDto)
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('DELETE /post/:id should return 401 without token', async () => {
        const postsResponse = await request(app.getHttpServer())
            .get('/post')
            .set('Authorization', token);

        const postId = postsResponse.body[0].id;

        return request(app.getHttpServer())
            .delete(`/post/${postId}`)
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('DELETE /post/:id should delete a post with valid token', async () => {
        const postsResponse = await request(app.getHttpServer())
            .get('/post')
            .set('Authorization', token);

        const postId = postsResponse.body[0].id;

        return request(app.getHttpServer())
            .delete(`/post/${postId}`)
            .set('Authorization', token)
            .expect(204)
            .then((response) => {
                expect(response.body).toBeDefined();
            });
    });
});