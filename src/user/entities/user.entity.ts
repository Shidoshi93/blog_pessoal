import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Posts } from '../../posts/entities/posts.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tb_user')
export class User {
  @ApiProperty({ example: 1, description: 'Unique identifier for the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'john_doe', description: 'Username of the user' })
  @IsNotEmpty()
  @Column({ unique: true, nullable: false, length: 255 })
  username: string;

  @ApiProperty({ example: 'StrongP@ssw0rd!', description: 'Password of the user' })
  // Password will be excluded only when transforming to plain object (e.g., in responses)
  @Exclude({ toPlainOnly: true })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsNotEmpty()
  @Column({ nullable: false, length: 255 })
  password: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the user' })
  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true, nullable: false, length: 255 })
  email: string;

  @ApiProperty({ example: 'http://example.com/photo.jpg', description: 'URL of the user photo' })
  @Column({ nullable: true, length: 5000 })
  photo: string;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: 'Date when the user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-01-02T00:00:00Z', description: 'Date when the user was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'Posts created by the user' })
  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];
}
