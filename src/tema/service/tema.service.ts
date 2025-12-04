import { 
    Injectable, 
    InternalServerErrorException, 
    Logger, 
    NotFoundException 
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";
import { CrudRepositoryContract } from "../../common/interfaces/crudRepositoryContract";

@Injectable()
export class TemaService implements CrudRepositoryContract<Tema> {
    private readonly logger = new Logger(TemaService.name);
    
    constructor(@InjectRepository(Tema) private temaRepository: Repository<Tema>) {}

    async create(tema: Tema): Promise<Tema> {
        this.logger.log('Criando um novo tema no banco de dados.');

        try {
            const temaSalvo = await this.temaRepository.save(tema);
            this.logger.log(`Tema com ID ${temaSalvo.id} criado com sucesso.`);

            return temaSalvo;
        } catch (error) {
            this.logger.error('Erro ao criar um novo tema', error.message);
            throw new InternalServerErrorException('Erro ao criar tema.');
        }
    }

    async findAll(): Promise<Tema[]> {
        this.logger.log('Buscando todos temas');
        let temas: Tema[] = [];

        try {
            temas = await this.temaRepository.find({
                relations: { postagem: true }
            });
        } catch (error) {
            this.logger.error('Erro ao buscar todos temas', error.stack);
        }

        if (temas.length === 0) {
            this.logger.log('Nenhum tema encontrado');
        }
        
        return temas;
    }

    async findById(id: number): Promise<Tema> {
        this.logger.log(`Buscando tema com id: ${id}`);
        let tema: Tema | null = null;

        try {
            tema = await this.temaRepository.findOne({
                where: { id },
                relations: { postagem: true }
            });
        } catch (error) {
            this.logger.error(`Erro ao buscar tema com id: ${id}`, error.stack);
            throw new InternalServerErrorException('Erro ao buscar tema por ID.');
        }

        if (!tema) {
            this.logger.log(`Nenhum tema encontrado com id: ${id}`);
            throw new NotFoundException(`Tema com ID ${id} não encontrado.`);
        }

        return tema;
    }
       
    async findByDescricao(descricao: string): Promise<Tema[]> {
        this.logger.log(`Buscando temas com descrição: ${descricao}`);
        let temas: Tema[] = [];
        try {
            temas = await this.temaRepository.find({
                where: {
                    descricao: ILike(`%${descricao}%`)
                },
                relations: { postagem: true }
            });
        } catch (error) {
            this.logger.error(`Erro ao buscar temas com descrição: ${descricao}`, error.message);
            throw new InternalServerErrorException('Erro ao buscar temas por descrição.');
        }

        if (temas.length === 0) {
            this.logger.log(`Nenhum tema encontrado com descrição: ${descricao}`);
            throw new NotFoundException(`Nenhum tema encontrado com descrição: ${descricao}`);
        }

        return temas;
    }

    async update(tema: Tema): Promise<Tema> {
        this.logger.log(`Atualizando tema com id: ${tema.id}`);

            try {
                await this.findById(tema.id);
                return this.temaRepository.save(tema);
            } catch (error) {
                this.logger.error(`Erro ao atualizar tema com id: ${tema.id}`, error.message);
                throw new InternalServerErrorException('Erro ao atualizar tema.');
            }
    }

    async delete(id: number): Promise<DeleteResult> {
        this.logger.log(`Deletando tema com id: ${id}`);

        try {
            await this.findById(id);
            return this.temaRepository.delete(id);
        } catch (error) {
            this.logger.error(`Erro ao deletar tema com id: ${id}`, error.message);
            throw new InternalServerErrorException('Erro ao deletar tema.');
        }
    }
}