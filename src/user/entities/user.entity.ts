import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Posts } from "../../posts/entities/posts.entity";
import { Exclude } from "class-transformer";

@Entity('tb_user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ unique: true, nullable: false, length: 255 })
    username: string;

    @IsNotEmpty()
    @Exclude() // This will exclude the password field when transforming the entity to JSON
    @Column({ nullable: false, length: 255 })
    password: string;

    @IsNotEmpty()
    @Column({ unique: true, nullable: false, length: 255 })
    email: string;

    @Column({ nullable: true, length: 5000 })
    photo: string;

    @CreateDateColumn()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => Posts, (post) => post.user)
    posts: Posts[];
}