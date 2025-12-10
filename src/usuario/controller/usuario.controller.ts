import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { UsuarioService } from "../service/usuario.service";
import { Usuario } from "../entities/usuario.entity";

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<Usuario> {
        return await this.usuarioService.findById(id);
    }

    @Get('/email/:email')
    @HttpCode(HttpStatus.OK)
    async findByEmail(@Param('email') email: string): Promise<Usuario> {
        return await this.usuarioService.findByEmail(email);
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    async findByNome(@Param('nome') nome: string): Promise<Usuario[]> {
        return await this.usuarioService.findByNome(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() usuario: Usuario): Promise<Usuario> {
        return await this.usuarioService.create(usuario);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario): Promise<Usuario> {
        return await this.usuarioService.update(usuario);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<void> {
        return await this.usuarioService.delete(id);
    }
}