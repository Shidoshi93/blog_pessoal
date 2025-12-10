import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Posts } from '../../posts/entities/posts.entity';

@Entity('tb_theme')
export class Theme {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    name: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    description: string;

    @CreateDateColumn()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => Posts, (post) => post.theme)
    posts: Posts[];
}