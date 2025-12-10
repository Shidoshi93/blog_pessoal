import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { In, Repository } from "typeorm";
import { BcryptService } from "../../auth/bcrypt/bcrypt";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(
        @InjectRepository(User)
        private usuarioRepository: Repository<User>,
        private bcryptService: BcryptService
    ) {}

    async findAll(): Promise<User[]> {
        this.logger.log('Fetching all users...');
        let usuarios: User[];
        try {
            usuarios = await this.usuarioRepository.find();
            this.logger.log(`Found ${usuarios.length} users.`);
            return usuarios;
        } catch (error) {
            this.logger.error('Error fetching users', error);
            throw new InternalServerErrorException('Error fetching users');
        }
    }

    async findById(id: number): Promise<User> {
        this.logger.log(`Fetching user with ID: ${id}`);
        try {
            const usuario = await this.usuarioRepository.findOneBy({ id });
            if (!usuario) {
                this.logger.warn(`User with ID: ${id} not found.`);
                throw new NotFoundException('User not found');
            }
            this.logger.log(`User with ID: ${id} found.`);
            return usuario;
        } catch (error) {
            this.logger.error(`Error fetching user with ID: ${id}`, error);
            throw new InternalServerErrorException('Error fetching user');
        }
    }

    async findByEmail(email: string): Promise<User> {
        this.logger.log(`Fetching user with email: ${email}`);
        try {
            const usuario = await this.usuarioRepository.findOneBy({ email });
            if (!usuario) {
                this.logger.warn(`User with email: ${email} not found.`);
                throw new Error('User not found');
            }
            this.logger.log(`User with email: ${email} found.`);
            return usuario;
        } catch (error) {
            this.logger.error(`Error fetching user with email: ${email}`, error);
            throw new InternalServerErrorException('Error fetching user');
        }
    }

    // using query builder for practice
    async findByUsername(username: string): Promise<User[]> {
        this.logger.log(`Fetching users with username like: ${username}`);
        try {
            const usuarios = await this.usuarioRepository
                .createQueryBuilder('tb_user')
                .where('tb_user.username LIKE :username', { username: `%${username}%` })
                .getMany();
            this.logger.log(`Found ${usuarios.length} users with username like: ${username}`);
            return usuarios;
        } catch (error) {
            this.logger.error(`Error fetching users with username like: ${username}`, error);
            throw new InternalServerErrorException('Error fetching users');
        }
    }

    async create(user: User): Promise<User> {
        this.logger.log('Creating new user...');
        try {
            user.password = await this.bcryptService.hashPassword(user.password);
            const newUser = this.usuarioRepository.create(user);
            await this.usuarioRepository.save(newUser);
            this.logger.log('User created successfully.');
            return newUser;
        } catch (error) {
            this.logger.error('Error creating user', error);
            throw new InternalServerErrorException('Error creating user');
        }
    }

    async update(user: User): Promise<User> {
        this.logger.log(`Updating user with ID: ${user.id}`);
        try {
            const existingUser = await this.findById(user.id);
    
            if (user.password) {
                user.password = await this.bcryptService.hashPassword(user.password);
            } else {
                user.password = existingUser.password;
            }
            await this.usuarioRepository.save(user);
            this.logger.log(`User with ID: ${user.id} updated successfully.`);
            return user;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            this.logger.error(`Error updating user with ID: ${user.id}`, error);
            throw new InternalServerErrorException('Error updating user');
        }
    }

    async delete(id: number): Promise<DeleteResult> {
        this.logger.log(`Deleting user with ID: ${id}`);

        try {
            const result = await this.usuarioRepository.delete(id);
            if (result.affected === 0) {
                this.logger.warn(`User with ID: ${id} not found for deletion.`);
                throw new NotFoundException('User not found');
            }

            this.logger.log(`User with ID: ${id} deleted successfully.`);
            return result;
        } catch (error) {
            this.logger.error(`Error deleting user with ID: ${id}`, error);
            throw new InternalServerErrorException('Error deleting user');
        }
    }
}