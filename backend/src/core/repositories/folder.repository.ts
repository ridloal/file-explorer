import { Folder, FolderTree } from '../domain/entities/folder.entity';

export interface FolderRepository {
  findAll(): Promise<Folder[]>;
  findById(id: number): Promise<Folder | null>;
  findChildren(parentId: number): Promise<Folder[]>;
  getTree(): Promise<FolderTree[]>;
}