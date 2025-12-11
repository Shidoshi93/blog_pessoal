import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { UserService } from "../../user/service/user.service";
import { JwtService } from "@nestjs/jwt";
import { BcryptService } from "../bcrypt/bcrypt";
import { Posts } from "../../posts/entities/posts.entity";
import { User } from "../../user/entities/user.entity";

type ValidateUserResponse = {
    id: number;
    username: string;
    email: string;
    photo: string;
    createdAt: Date;
    updatedAt: Date;
    posts: Posts[];
}

type LoginResponse = {
    username: string;
    id: number;
    email: string;
    token: string;
}

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private bcryptService: BcryptService,
    ) { }

    async validateUser(email: string, password: string): Promise<ValidateUserResponse> {
        this.logger.log(`Validating credentials for email: ${email}`);
        let user: User;
        let passwordMatch: boolean;

        try {
            user = await this.userService.findByEmail(email);
            passwordMatch = await this.bcryptService.comparePassword(password, user.password);
        } catch (error) {
            this.logger.error(`Error finding user by email: ${email}`, error.stack);
            throw new InternalServerErrorException(`Error validating user credentials for email: ${email}`);
        }

        if (!user || !passwordMatch) {
            this.logger.warn(`Validation failed for email: ${email}`);
            throw new Error('Invalid credentials');
        }

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            photo: user.photo,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            posts: user.posts,
        };
    }

    async login(email: string, password: string): Promise<LoginResponse> {
        this.logger.log(`Logging in user with email: ${email}`);
        const user = await this.validateUser(email, password);

        return {
            username: user?.username,
            id: user.id,
            email: user.email,
            token: `Bearer ${this.jwtService.sign({id: user.id, username: user.username, email: user.email})}`
        };
    }
}