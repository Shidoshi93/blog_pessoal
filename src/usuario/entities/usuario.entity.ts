import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { Exclude } from "class-transformer";

@Entity('usuario')
export class Usuario {
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

    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem: Postagem[];
}