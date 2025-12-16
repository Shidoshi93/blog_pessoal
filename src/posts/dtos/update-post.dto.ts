import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdatePostDto {
    @ApiProperty({ example: 'My First Post', description: 'Title of the post', required: false })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ example: 'This is the content of my first post.', description: 'Content of the post', required: false })
    @IsOptional()
    @IsString()
    text?: string;

    @ApiProperty({ example: 1, description: 'ID of the theme associated with the post', required: false })
    @IsOptional()
    @IsNumber()
    themeId?: number;
}
