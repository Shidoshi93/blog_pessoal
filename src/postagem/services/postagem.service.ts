import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PostagemService {
    private readonly logger = new Logger(PostagemService.name);

    constructor(
        @InjectRepository(Postagem)
        private readonly postagemRepository: Repository<Postagem>
    ) {}

    async findAll(): Promise<Postagem[]> {
    this.logger.log(`Buscando todas as postagens do banco de dados.`);

        return await this.postagemRepository.find();
    }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }
}