import { Folder, FolderTree, File } from '../domain/entities/folder.entity';
import { FolderRepository } from '../repositories/folder.repository';
import { DrizzleFileRepository } from '../../infrastructure/database/repositories/files.repository';

export class FolderUseCase {
    constructor(
        private folderRepository: FolderRepository,
        private fileRepository: DrizzleFileRepository
    ) {}

    async getFolderContent(folderId: number): Promise<{
        folders: Folder[];
        files: File[];
    }> {
    const folders = await this.folderRepository.findChildren(folderId);
    const files = await this.fileRepository.findByFolderId(folderId);
    
    return { folders, files };
    }

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