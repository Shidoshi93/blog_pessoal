import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
    @ApiProperty({ example: 'My First Post', description: 'Title of the post' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'This is the content of my first post.', description: 'Content of the post' })
    @IsString()
    @IsNotEmpty()
    text: string;

    @ApiProperty({ example: 1, description: 'ID of the theme associated with the post' })
    @IsNumber()
    @IsNotEmpty()
    themeId: number;

    @ApiProperty({ example: 1, description: 'ID of the user who created the post' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
