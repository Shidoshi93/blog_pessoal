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
    Put 
} from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";

@Controller('/postagens')
export class PostagemController {

    constructor(private readonly postagemService: PostagemService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() postagem: Postagem): Promise<Postagem> {
        return await this.postagemService.create(postagem);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Postagem[]> {
        return await this.postagemService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Postagem | null> {
        return await this.postagemService.findById(id);
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    async findAllByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
        return await this.postagemService.findAllByTitulo(titulo);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async update(@Body() postagem: Postagem): Promise<Postagem> {
        return await this.postagemService.update(postagem);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.postagemService.delete(id);
    }
}