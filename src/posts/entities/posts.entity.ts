import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Theme } from '../../theme/entities/theme.entity';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_posts' })
export class Posts {
  @ApiProperty({ example: 1, description: 'Unique identifier for the post' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Sample Post Title', description: 'Title of the post' })
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  title: string;

  @ApiProperty({ example: 'This is the content of the post.', description: 'Content of the post' })
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  text: string;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: 'Date when the post was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-01-02T00:00:00Z', description: 'Date when the post was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ type: () => Theme, description: 'Theme associated with the post' })
  @ManyToOne(() => Theme, (theme) => theme.posts, {
    onDelete: 'CASCADE',
  })
  theme: Theme;

  @ApiProperty({ type: () => User, description: 'User who created the post' })
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  user: User;
}
