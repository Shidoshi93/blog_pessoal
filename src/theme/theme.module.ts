import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Theme } from "./entities/theme.entity";
import { ThemeController } from "./controller/theme.controller";
import { ThemeService } from "./service/theme.service";

@Module({
    imports: [TypeOrmModule.forFeature([Theme])],
    controllers: [ThemeController],
    providers: [ThemeService],
    exports: [ThemeService],
})
export class ThemeModule {}