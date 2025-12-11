import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Theme } from '../entities/theme.entity';
import { CrudRepositoryContract } from '../../common/interfaces/crudRepositoryContract';

@Injectable()
export class ThemeService implements CrudRepositoryContract<Theme> {
  private readonly logger = new Logger(ThemeService.name);

  constructor(
    @InjectRepository(Theme) private themeRepository: Repository<Theme>,
  ) {}

  private getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }

  async create(theme: Theme): Promise<Theme> {
    this.logger.log('Creating a new theme');

    try {
      const themeSaved = await this.themeRepository.save(theme);
      this.logger.log(`Theme with ID ${themeSaved.id} created successfully.`);
      return themeSaved;
    } catch (error: unknown) {
      this.logger.error(
        'Error creating a new theme',
        this.getErrorMessage(error),
      );
      throw new InternalServerErrorException('Error creating a new theme.');
    }
  }

  async findAll(): Promise<Theme[]> {
    this.logger.log('Fetching all themes');
    let themes: Theme[] = [];

    try {
      themes = await this.themeRepository.find({
        relations: { posts: true },
      });
    } catch (error: unknown) {
      this.logger.error(
        'Error fetching all themes',
        this.getErrorMessage(error),
      );
    }

    if (themes.length === 0) {
      this.logger.log('No themes found');
    }

    return themes;
  }

  async findById(id: number): Promise<Theme> {
    this.logger.log(`Fetching theme with id: ${id}`);
    let theme: Theme | null = null;

    try {
      theme = await this.themeRepository.findOne({
        where: { id },
        relations: { posts: true },
      });
    } catch (error: unknown) {
      this.logger.error(
        `Error fetching theme with id: ${id}`,
        this.getErrorMessage(error),
      );
      throw new InternalServerErrorException('Error fetching theme by ID.');
    }

    if (!theme) {
      this.logger.log(`No theme found with id: ${id}`);
      throw new NotFoundException(`Theme with ID ${id} not found.`);
    }

    return theme;
  }

  async findByDescription(description: string): Promise<Theme[]> {
    this.logger.log(`Searching themes with description: ${description}`);
    let themes: Theme[] = [];
    try {
      themes = await this.themeRepository.find({
        where: {
          description: ILike(`%${description}%`),
        },
        relations: { posts: true },
      });
    } catch (error: unknown) {
      this.logger.error(
        `Error searching themes with description: ${description}`,
        this.getErrorMessage(error),
      );
      throw new InternalServerErrorException(
        'Error searching themes by description.',
      );
    }

    if (themes.length === 0) {
      this.logger.log(`No themes found with description: ${description}`);
      throw new NotFoundException(
        `No themes found with description: ${description}`,
      );
    }

    return themes;
  }

  async findByName(name: string): Promise<Theme[]> {
    this.logger.log(`Searching themes with name: ${name}`);
    let themes: Theme[] = [];
    try {
      themes = await this.themeRepository.find({
        where: {
          name: ILike(`%${name}%`),
        },
        relations: { posts: true },
      });
    } catch (error: unknown) {
      this.logger.error(
        `Error searching themes with name: ${name}`,
        this.getErrorMessage(error),
      );
      throw new InternalServerErrorException('Error searching themes by name.');
    }

    if (themes.length === 0) {
      this.logger.log(`No themes found with name: ${name}`);
      throw new NotFoundException(`No themes found with name: ${name}`);
    }

    return themes;
  }

  async update(theme: Theme): Promise<Theme> {
    this.logger.log(`Updating theme with id: ${theme.id}`);
    try {
      await this.findById(theme.id);
      return this.themeRepository.save(theme);
    } catch (error: unknown) {
      this.logger.error(
        `Error updating theme with id: ${theme.id}`,
        this.getErrorMessage(error),
      );
      throw new InternalServerErrorException('Error updating theme.');
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    this.logger.log(`Deleting theme with id: ${id}`);

    try {
      await this.findById(id);
      return this.themeRepository.delete(id);
    } catch (error: unknown) {
      this.logger.error(
        `Error deleting theme with id: ${id}`,
        this.getErrorMessage(error),
      );
      throw new InternalServerErrorException('Error deleting theme.');
    }
  }
}
