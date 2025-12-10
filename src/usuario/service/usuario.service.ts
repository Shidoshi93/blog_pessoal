import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { In, Repository } from "typeorm";
import { BcryptService } from "../../auth/bcrypt/bcrypt";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcryptService: BcryptService
    ) {}

    async findAll(): Promise<Usuario[]> {
        Logger.log('Fetching all users...');
        let usuarios: Usuario[];
        try {
            usuarios = await this.usuarioRepository.find();
            Logger.log(`Found ${usuarios.length} users.`);
            return usuarios;
        } catch (error) {
            Logger.error('Error fetching users', error);
            throw new InternalServerErrorException('Error fetching users');
        }
    }

    async findById(id: string): Promise<Usuario> {
        Logger.log(`Fetching user with ID: ${id}`);
        try {
            const usuario = await this.usuarioRepository.findOneBy({ id: Number(id) });
            if (!usuario) {
                Logger.warn(`User with ID: ${id} not found.`);
                throw new NotFoundException('User not found');
            }
            Logger.log(`User with ID: ${id} found.`);
            return usuario;
        } catch (error) {
            Logger.error(`Error fetching user with ID: ${id}`, error);
            throw new InternalServerErrorException('Error fetching user');
        }
    }

    async findByEmail(email: string): Promise<Usuario> {
        Logger.log(`Fetching user with email: ${email}`);
        try {
            const usuario = await this.usuarioRepository.findOneBy({ email });
            if (!usuario) {
                Logger.warn(`User with email: ${email} not found.`);
                throw new Error('User not found');
            }
            Logger.log(`User with email: ${email} found.`);
            return usuario;
        } catch (error) {
            Logger.error(`Error fetching user with email: ${email}`, error);
            throw new InternalServerErrorException('Error fetching user');
        }
    }

    // using query builder for practice
    async findByNome(nome: string): Promise<Usuario[]> {
        Logger.log(`Fetching users with name like: ${nome}`);
        try {
            const usuarios = await this.usuarioRepository
                .createQueryBuilder('usuario')
                .where('usuario.nome LIKE :nome', { nome: `%${nome}%` })
                .getMany();
            Logger.log(`Found ${usuarios.length} users with name like: ${nome}`);
            return usuarios;
        } catch (error) {
            Logger.error(`Error fetching users with name like: ${nome}`, error);
            throw new InternalServerErrorException('Error fetching users');
        }
    }

    async create(usuario: Usuario): Promise<Usuario> {
        Logger.log('Creating new user...');
        try {
            usuario.password = await this.bcryptService.hashPassword(usuario.password);
            const newUsuario = this.usuarioRepository.create(usuario);
            await this.usuarioRepository.save(newUsuario);
            Logger.log('User created successfully.');
            return newUsuario;
        } catch (error) {
            Logger.error('Error creating user', error);
            throw new InternalServerErrorException('Error creating user');
        }
    }

    async update(usuario: Usuario): Promise<Usuario> {
        Logger.log(`Updating user with ID: ${usuario.id}`);
        try {
            const existingUsuario = await this.findById(String(usuario.id));
    
            if (usuario.password) {
                usuario.password = await this.bcryptService.hashPassword(usuario.password);
            } else {
                usuario.password = existingUsuario.password;
            }
            await this.usuarioRepository.save(usuario);
            Logger.log(`User with ID: ${usuario.id} updated successfully.`);
            return usuario;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            Logger.error(`Error updating user with ID: ${usuario.id}`, error);
            throw new InternalServerErrorException('Error updating user');
        }
    }

    async delete(id: string): Promise<void> {
        Logger.log(`Deleting user with ID: ${id}`);

        try {
            const result = await this.usuarioRepository.delete(Number(id));
            if (result.affected === 0) {
                Logger.warn(`User with ID: ${id} not found for deletion.`);
                throw new Error('User not found');
            }

            Logger.log(`User with ID: ${id} deleted successfully.`);
        } catch (error) {
            Logger.error(`Error deleting user with ID: ${id}`, error);
            throw InternalServerErrorException;
        }
    }
}