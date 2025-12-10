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
import { TemaService } from "../service/tema.service";
import { Tema } from "../entities/tema.entity";

@Controller('/temas')
export class TemaController {
    constructor(private readonly temaService: TemaService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() tema: Tema): Promise<Tema> {
        return await this.temaService.create(tema);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Tema[]> {
        return await this.temaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Tema> {
        return await this.temaService.findById(id);
    }

    @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK)
    async findByDescricao(@Param('descricao') descricao: string): Promise<Tema[]> {
        return await this.temaService.findByDescricao(descricao);
    }

    @Get('/tema/:tema')
    @HttpCode(HttpStatus.OK)
    async findByTema(@Param('tema') tema: string): Promise<Tema[]> {
        return await this.temaService.findByTema(tema);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async update(@Body() tema: Tema): Promise<Tema> {
        return await this.temaService.update(tema);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.temaService.delete(id);
    }
}