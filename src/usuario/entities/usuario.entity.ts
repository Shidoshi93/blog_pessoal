import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ unique: true, nullable: false, length: 255 })
    username: string;

    @IsNotEmpty()
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
}