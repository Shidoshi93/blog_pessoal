import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { User } from "../entities/user.entity";
import { CrudRepositoryContract } from "../../common/interfaces/crudRepositoryContract";
import { DeleteResult } from "typeorm";

@Controller('user')
export class UserController implements CrudRepositoryContract<User> {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id') id: number): Promise<User> {
        return await this.userService.findById(id);
    }

    @Get('/email/:email')
    @HttpCode(HttpStatus.OK)
    async findByEmail(@Param('email') email: string): Promise<User> {
        return await this.userService.findByEmail(email);
    }

    @Get('/username/:username')
    @HttpCode(HttpStatus.OK)
    async findByUsername(@Param('username') username: string): Promise<User[]> {
        return await this.userService.findByUsername(username);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() usuario: User): Promise<User> {
        return await this.userService.create(usuario);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: User): Promise<User> {
        return await this.userService.update(usuario);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: number): Promise<DeleteResult> {
        return await this.userService.delete(id);
    }
}