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

@Entity('tb_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ unique: true, nullable: false, length: 255 })
  username: string;

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

  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true, nullable: false, length: 255 })
  email: string;

  @Column({ nullable: true, length: 5000 })
  photo: string;

  @CreateDateColumn()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];
}
