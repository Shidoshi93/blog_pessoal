import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppTestModule } from '../../src/app-test.module';

describe('ThemesController (E2E)', () => {
    let app: INestApplication<App>;
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

        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: `testuser@test.com`,
                password: 'TestPassword123!',
            });

        token = loginResponse.body.token;
    });

    afterAll(async () => {
        await app.close();
    });

    it('POST /theme should create a new theme with valid token', async () => {
        const createThemeDto = {
            description: 'Descrição do Tema de Teste',
            name: 'Tema de Teste',
        };

        return request(app.getHttpServer())
            .post('/theme')
            .set('Authorization', token)
            .send(createThemeDto)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.id).toBeDefined();
                expect(response.body.description).toBe(createThemeDto.description);
                expect(response.body.name).toBe(createThemeDto.name);
                themeId = response.body.id;
            });
    });

    it('POST /theme should not create themes with invalid token', async () => {
        const createThemeDto = {
            description: 'Descrição do Tema de Teste Inválido',
            name: 'Tema de Teste Inválido',
        };

        return request(app.getHttpServer())
            .post('/theme')
            .set('Authorization', 'InvalidToken')
            .send(createThemeDto)
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('GET /theme should return 401 without token', async () => {
        return request(app.getHttpServer())
            .get('/theme')
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('GET /theme should return themes with valid token', async () => {
        return request(app.getHttpServer())
            .get('/theme')
            .set('Authorization', token)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(Array.isArray(response.body)).toBe(true);
            });
    });

    it('GET /theme/:id should return 401 without token', async () => {
        return request(app.getHttpServer())
            .get('/theme/1')
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('GET /theme/:id should return theme with valid token', async () => {
        return request(app.getHttpServer())
            .get('/theme/1')
            .set('Authorization', token)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.id).toBe(1);
            });
    });

    it('GET /theme/description/:description should return 401 without token', async () => {
        return request(app.getHttpServer())
            .get('/theme/description/Teste')
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('GET /theme/description/:description should return themes with valid token', async () => {
        return request(app.getHttpServer())
            .get('/theme/description/Teste')
            .set('Authorization', token)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(Array.isArray(response.body)).toBe(true);
            });
    });

    it('UPDATE /theme should update a theme with valid token', async () => {
        const updateThemeDto = {
            id: 1,
            description: 'Descrição Atualizada do Tema de Teste',
            name: 'Tema de Teste Atualizado',
        };

        return request(app.getHttpServer())
            .put('/theme')
            .set('Authorization', token)
            .send(updateThemeDto)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.id).toBe(updateThemeDto.id);
                expect(response.body.description).toBe(updateThemeDto.description);
                expect(response.body.name).toBe(updateThemeDto.name);
            });
    });

    it('UPDATE /theme should return 401 without token', async () => {
        const updateThemeDto = {
            id: 1,
            description: 'Descrição Atualizada do Tema de Teste',
            name: 'Tema de Teste Atualizado',
        };

        return request(app.getHttpServer())
            .put('/theme')
            .send(updateThemeDto)
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });

    it('DELETE /theme/:id should delete a theme with valid token', async () => {
        return request(app.getHttpServer())
            .delete(`/theme/${themeId}`)
            .set('Authorization', token)
            .expect(204)
            .then((response) => {
                expect(response.body).toBeDefined();
            });
    });

    it('DELETE /theme/:id should return 401 without token', async () => {
        return request(app.getHttpServer())
            .delete(`/theme/${themeId}`)
            .expect(401)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe('Unauthorized');
            });
    });
});