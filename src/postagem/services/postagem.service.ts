import { 
    Injectable, 
    InternalServerErrorException, 
    Logger, 
    NotFoundException 
} from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TemaService } from "../../tema/service/tema.service";

@Injectable()
export class PostagemService {
    private readonly logger = new Logger(PostagemService.name);

    constructor(
        @InjectRepository(Postagem)
        private readonly postagemRepository: Repository<Postagem>,
        private readonly temaService: TemaService,
    ) {}

    async create(postagem: Postagem): Promise<Postagem> {
        this.logger.log('Criando uma nova postagem no banco de dados.');

        try {
            await this.temaService.findById(postagem.tema.id);
            const createdPostagem = await this.postagemRepository.save(postagem);
            this.logger.log(`Postagem com ID ${createdPostagem.id} criada com sucesso.`);

            return createdPostagem;
        } catch (error) {
            this.logger.error('Erro ao criar postagem:', error.message);
            throw new InternalServerErrorException('Erro ao criar postagem.');
        }
    }

    async findAll(): Promise<Postagem[]> {
    this.logger.log(`Buscando todas as postagens do banco de dados.`);
        let posts: Postagem[] = [];
        try {
            posts = await this.postagemRepository.find({
                relations: { tema: true }
            });
        } catch (error) {
            this.logger.error('Erro ao buscar postagens:', error.message);
            throw new InternalServerErrorException('Erro ao buscar postagens.');
        }

        if (posts.length === 0) {
            this.logger.log('Nenhuma postagem encontrada no banco de dados.');
        }

        return posts;
    }

    async findById(id: number): Promise<Postagem> {
        this.logger.log(`Buscando a postagem com ID ${id} no banco de dados.`);
        let postagem: Postagem | null = null;

        try {
            postagem = await this.postagemRepository.findOne({
                where: { id },
                relations: { tema: true }
             });
        } catch (error) {
            this.logger.error(`Erro ao buscar postagem com ID ${id}:`, error.message);
            throw new InternalServerErrorException('Erro ao buscar postagem por ID.');
        }

        if (!postagem) {
            this.logger.warn(`Postagem com ID ${id} não encontrada.`);
            throw new NotFoundException(`Postagem com ID ${id} não encontrada.`);
        }

        return postagem;
    }

    async findAllByTitulo(titulo: string): Promise<Postagem[]> {
        this.logger.log(`Buscando postagens com título contendo '${titulo}'.`);
        let posts: Postagem[] = [];

        try {
            posts = await this.postagemRepository.find({
                where: {
                    titulo: ILike(`%${titulo}%`)
                },
                relations: { tema: true }
            });
        } catch (error) {
            this.logger.error(`Erro ao buscar postagens com título '${titulo}':`, error.message);
            throw new InternalServerErrorException('Erro ao buscar postagens por título.');
        }

        if (posts.length === 0) {
            this.logger.log(`Nenhuma postagem encontrada com o título contendo '${titulo}'.`);
        }

        return posts;
    }

    async update(postagem: Postagem): Promise<Postagem> {
        this.logger.log(`Atualizando a postagem com ID ${postagem.id}.`);

        try {
            await this.findById(postagem.id);
            await this.temaService.findById(postagem.tema.id);

            const updatedPostagem = await this.postagemRepository.save(postagem);
            this.logger.log(`Postagem com ID ${postagem.id} atualizada com sucesso.`);

            return updatedPostagem;
        } catch (error) {
            this.logger.error(`Erro ao atualizar postagem com ID ${postagem.id}:`, error.message);
            throw new InternalServerErrorException('Erro ao atualizar postagem.');
        }
    }

    async delete(id: number): Promise<DeleteResult> {
        this.logger.log(`Excluindo a postagem com ID ${id}.`);

        try {
            const postagem = await this.findById(id);
            const result = await this.postagemRepository.delete(postagem.id);
            this.logger.log(`Postagem com ID ${id} excluída com sucesso.`);

            return result;
        } catch (error) {
            this.logger.error(`Erro ao excluir postagem com ID ${id}:`, error.message);
            throw new InternalServerErrorException('Erro ao excluir postagem.');
        }
    }
}