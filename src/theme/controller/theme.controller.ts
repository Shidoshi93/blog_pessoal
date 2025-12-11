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
    Put, 
    UseGuards
} from "@nestjs/common";
import { ThemeService } from "../service/theme.service";
import { Theme } from "../entities/theme.entity";
import { CrudRepositoryContract } from "../../common/interfaces/crudRepositoryContract";
import { DeleteResult } from "typeorm";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@Controller('/theme')
export class ThemeController implements CrudRepositoryContract<Theme> {
    constructor(private readonly themeService: ThemeService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() theme: Theme): Promise<Theme> {
        return await this.themeService.create(theme);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Theme[]> {
        return await this.themeService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id', ParseIntPipe) id: number): Promise<Theme> {
        return await this.themeService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/description/:description')
    @HttpCode(HttpStatus.OK)
    async findByDescription(@Param('description') description: string): Promise<Theme[]> {
        return await this.themeService.findByDescription(description);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/name/:name')
    @HttpCode(HttpStatus.OK)
    async findByName(@Param('name') name: string): Promise<Theme[]> {
        return await this.themeService.findByName(name);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @HttpCode(HttpStatus.OK)
    async update(@Body() theme: Theme): Promise<Theme> {
        return await this.themeService.update(theme);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return await this.themeService.delete(id);
    }
}