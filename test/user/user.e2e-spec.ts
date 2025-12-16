import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { App } from "supertest/types";
import { AppTestModule } from "../../src/app-test.module";
import request from 'supertest';
import { User } from "../../src/user/entities/user.entity";

describe('PostsController (E2E)', () => {
    let app: INestApplication<App>;
    let userId: number;
    let token: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppTestModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('POST /user should create a new user without token', async () => {
        return request(app.getHttpServer())
            .post('/user/signup')
            .send({
                username: `testuser`,
                email: `testuser@test.com`,
                password: 'TestPassword123!',
            })
            .expect(201)
            .then((userResponse) => {
                expect(userResponse.body).toBeDefined();
                expect(userResponse.body.id).toBeDefined();
                expect(userResponse.body.username).toBe('testuser');
                expect(userResponse.body.email).toBe('testuser@test.com');
                userId = userResponse.body.id;
            });

    });

    it ('POST /auth/login should authenticate user and return token', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: `testuser@test.com`,
                password: 'TestPassword123!',
            })
            .expect(200)
            .expect((res) => {
                expect(res.body).toBeDefined();
                expect(res.body.token).toBeDefined();
                token = res.body.token;
            });
    });

    it('GET /user should return user data with valid token', async () => {
        return request(app.getHttpServer())
            .get('/user')
            .set('Authorization', token)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(Array.isArray(response.body)).toBe(true);
                const user = response.body.find((u: User) => u.id === userId);
                expect(user).toBeDefined();
                expect(user.username).toBe('testuser');
                expect(user.email).toBe('testuser@test.com');
            });
    });

    it('GET /user should return 401 without token', async () => {
        return request(app.getHttpServer())
            .get('/user')
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('GET /user/:id should return user data with valid token', async () => {
        return request(app.getHttpServer())
            .get(`/user/${userId}`)
            .set('Authorization', token)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.id).toBe(userId);
                expect(response.body.username).toBe('testuser');
                expect(response.body.email).toBe('testuser@test.com');
            });
    });

    it('GET /user/:id should return 401 without token', async () => {
        return request(app.getHttpServer())
            .get(`/user/${userId}`)
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('GET /user/username/:name should return user data with valid token', async () => {
        return request(app.getHttpServer())
            .get(`/user/username/testuser`)
            .set('Authorization', token)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(Array.isArray(response.body)).toBe(true);
                expect(response.body.length).toBeGreaterThan(0);
                const user = response.body[0];
                expect(user.id).toBe(userId);
                expect(user.username).toBe('testuser');
                expect(user.email).toBe('testuser@test.com');
            });
    });
    
    it('GET /user/username/:name should return 401 without token', async () => {
        return request(app.getHttpServer())
            .get(`/user/username/testuser`)
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('GET /user/email/:email should return user data with valid token', async () => {
        return request(app.getHttpServer())
            .get(`/user/email/testuser@test.com`)
            .set('Authorization', token)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.id).toBe(userId);
                expect(response.body.username).toBe('testuser');
                expect(response.body.email).toBe('testuser@test.com');
            });
    });

    it('GET /user/email/:email should return 401 without token', async () => {
        return request(app.getHttpServer())
            .get(`/user/email/testuser@test.com`)
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('PUT /user should return 401 without token', async () => {
        return request(app.getHttpServer())
            .put('/user')
            .send({
                id: userId,
                username: 'updateduser',
                email: 'updateduser@test.com',
                password: 'UpdatedPassword123!',
            })
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('PUT /user should update user data with valid token', async () => {
        return request(app.getHttpServer())
            .put('/user')
            .set('Authorization', token)
            .send({
                id: userId,
                username: 'updateduser',
                email: 'updateduser@test.com',
                password: 'UpdatedPassword123!',
            })
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.id).toBe(userId);
                expect(response.body.username).toBe('updateduser');
                expect(response.body.email).toBe('updateduser@test.com');
            });
    });

    it('DELETE /user/:id should return 401 without token', async () => {
        return request(app.getHttpServer())
            .delete(`/user/${userId}`)
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('DELETE /user/:id should delete user with valid token', async () => {
        return request(app.getHttpServer())
            .delete(`/user/${userId}`)
            .set('Authorization', token)
            .expect(204);
    });
});