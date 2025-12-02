import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";

@Controller('/postagens')
export class PostagemController {
    constructor(private readonly postagemService: PostagemService) {}

    @Get()
    @HttpCode(200)
    async findAll(): Promise<Postagem[]> {
        let posts: Postagem[] = [];
        
        try {
            posts = await this.postagemService.findAll();

            if (posts.length === 0) {
                console.log('Nenhuma postagem encontrada.');
            }
            
        } catch (error) {
            console.error('Erro ao buscar postagens:', error.message);
        }

        return posts;
    }

    @Post()
    @HttpCode(200)
    async create(@Body() postagem: Postagem): Promise<Postagem | null> {
        let createdPost: Postagem | null = null;

        try {
            createdPost = await this.postagemService.create(postagem);
        } catch (error) {
            console.error('Erro ao criar postagem:', error.message);
        }

        return createdPost;
    }
}