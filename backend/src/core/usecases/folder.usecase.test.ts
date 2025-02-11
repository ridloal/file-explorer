import { FolderUseCase } from './folder.usecase';
import { FolderRepository } from '../repositories/folder.repository';
import { DrizzleFileRepository } from '../../infrastructure/database/repositories/files.repository';
import { Folder, FolderTree, File } from '../domain/entities/folder.entity';

class MockFolderRepository implements FolderRepository {
    private folders: Folder[] = [
        { id: 1, name: 'Root', parentId: null, path: '/', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'Child 1', parentId: 1, path: '/child1', createdAt: new Date(), updatedAt: new Date() },
        { id: 3, name: 'Child 2', parentId: 1, path: '/child2', createdAt: new Date(), updatedAt: new Date() }
    ];

    async findAll(): Promise<Folder[]> {
        return this.folders;
    }

    async findById(id: number): Promise<Folder | null> {
        return this.folders.find(folder => folder.id === id) || null;
    }

    async findChildren(parentId: number): Promise<Folder[]> {
        return this.folders.filter(folder => folder.parentId === parentId);
    }

    async getTree(): Promise<FolderTree[]> {
        const buildTree = (parentId: number | null): FolderTree[] => {
            return this.folders
                .filter(folder => folder.parentId === parentId)
                .map(folder => ({
                    ...folder,
                    children: buildTree(folder.id)
                }));
        };
        return buildTree(null);
    }
}

class MockFileRepository implements DrizzleFileRepository {
    private files: File[] = [
        { id: 1, name: 'File 1', folderId: 1, size: 1024, mimeType: 'text/plain', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'File 2', folderId: 2, size: 2048, mimeType: 'text/plain', createdAt: new Date(), updatedAt: new Date() }
    ];

    async findByFolderId(folderId: number): Promise<File[]> {
        return this.files.filter(file => file.folderId === folderId);
    }
}

describe('FolderUseCase', () => {
    let folderUseCase: FolderUseCase;
    let folderRepository: FolderRepository;
    let fileRepository: DrizzleFileRepository;

    beforeEach(() => {
        folderRepository = new MockFolderRepository();
        fileRepository = new MockFileRepository();
        folderUseCase = new FolderUseCase(folderRepository, fileRepository);
    });

    test('getFolderContent should return folders and files for a given folderId', async () => {
        const content = await folderUseCase.getFolderContent(1);
        expect(content.folders).toHaveLength(2);
        expect(content.files).toHaveLength(1);
    });

    test('getAllFolders should return all folders', async () => {
        const folders = await folderUseCase.getAllFolders();
        expect(folders).toHaveLength(3);
    });

    test('getFolderTree should return the correct folder tree', async () => {
        const tree = await folderUseCase.getFolderTree();
        expect(tree).toHaveLength(1);
        expect(tree[0].children).toHaveLength(2);
    });

    test('getFolderChildren should return the correct children for a given folderId', async () => {
        const children = await folderUseCase.getFolderChildren(1);
        expect(children).toHaveLength(2);
    });

    test('getFolderChildren should return an empty array for a folder with no children', async () => {
        const children = await folderUseCase.getFolderChildren(3);
        expect(children).toHaveLength(0);
    });
});