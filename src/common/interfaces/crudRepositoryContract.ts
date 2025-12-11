import { DeleteResult } from 'typeorm';

export interface CrudRepositoryContract<T> {
  create(item: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  update(item: T): Promise<T>;
  delete(id: number): Promise<DeleteResult>;
}
