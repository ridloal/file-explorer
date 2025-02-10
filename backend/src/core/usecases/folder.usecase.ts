import { Folder, FolderTree } from '../domain/entities/folder.entity';
import { FolderRepository } from '../repositories/folder.repository';

export class FolderUseCase {
  constructor(private folderRepository: FolderRepository) {}

  async getAllFolders(): Promise<Folder[]> {
    return await this.folderRepository.findAll();
  }

  async getFolderTree(): Promise<FolderTree[]> {
    return await this.folderRepository.getTree();
  }

  async getFolderChildren(folderId: number): Promise<Folder[]> {
    return await this.folderRepository.findChildren(folderId);
  }
}