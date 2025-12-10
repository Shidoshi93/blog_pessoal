import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, OneToMany } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';

@Entity('tb_temas')
export class Tema {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    tema: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    descricao: string;

    @UpdateDateColumn()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data: Date;

    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[];
}