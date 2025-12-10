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
import { ThemeService } from "../service/theme.service";
import { Theme } from "../entities/theme.entity";
import { CrudRepositoryContract } from "../../common/interfaces/crudRepositoryContract";
import { DeleteResult } from "typeorm";

@Controller('/theme')
export class ThemeController implements CrudRepositoryContract<Theme> {
    constructor(private readonly themeService: ThemeService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() theme: Theme): Promise<Theme> {
        return await this.themeService.create(theme);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Theme[]> {
        return await this.themeService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id', ParseIntPipe) id: number): Promise<Theme> {
        return await this.themeService.findById(id);
    }

    @Get('/description/:description')
    @HttpCode(HttpStatus.OK)
    async findByDescription(@Param('description') description: string): Promise<Theme[]> {
        return await this.themeService.findByDescription(description);
    }

    @Get('/name/:name')
    @HttpCode(HttpStatus.OK)
    async findByName(@Param('name') name: string): Promise<Theme[]> {
        return await this.themeService.findByName(name);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async update(@Body() theme: Theme): Promise<Theme> {
        return await this.themeService.update(theme);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return await this.themeService.delete(id);
    }
}