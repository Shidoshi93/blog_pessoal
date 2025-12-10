import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Posts } from "./entities/posts.entity";
import { PostsController } from "./controllers/posts.controller";
import { PostsService } from "./services/posts.service";
import { ThemeModule } from "../theme/theme.module";

@Module({
    imports: [TypeOrmModule.forFeature([Posts]), ThemeModule],
    controllers: [PostsController],
    providers: [PostsService],
    exports: [],
})
export class PostsModule {}