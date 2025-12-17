import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Posts } from '../../posts/entities/posts.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tb_theme')
export class Theme {
  @ApiProperty({ example: 1, description: 'Unique identifier for the theme' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Nature', description: 'Name of the theme' })
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  name: string;

  @ApiProperty({ example: 'A theme related to nature and the environment', description: 'Description of the theme' })
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  description: string;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: 'Date when the theme was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-01-02T00:00:00Z', description: 'Date when the theme was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'Posts associated with the theme' })
  @OneToMany(() => Posts, (post) => post.theme)
  posts: Posts[];
}
