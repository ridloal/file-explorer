import { FolderController } from './folder.controller';
import { FolderUseCase } from '../../core/usecases/folder.usecase';
import { Context } from 'elysia';
import { Folder, FolderTree, File } from '../../core/domain/entities/folder.entity';
import { FolderRepository } from '../../core/repositories/folder.repository';
import { DrizzleFileRepository } from '../../infrastructure/database/repositories/files.repository';

class MockFolderUseCase extends FolderUseCase {
    constructor() {
        super({} as FolderRepository, {} as DrizzleFileRepository);
    }
    async getAllFolders(): Promise<Folder[]> {
        return [];
    }
    async getFolderTree(): Promise<FolderTree[]> {
        return [
            {
                id: 1,
                name: 'Root',
                parentId: null,
                path: '/',
                createdAt: new Date(),
                updatedAt: new Date(),
                children: [
                    {
                        id: 2,
                        name: 'Child 1',
                        parentId: 1,
                        path: '/child1',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        children: []
                    }
                ]
            }
        ];
    }

    async getFolderChildren(folderId: number): Promise<Folder[]> {
        if (folderId === 1) {
            return [
                { id: 2, name: 'Child 1', parentId: 1, path: '/child1', createdAt: new Date(), updatedAt: new Date() }
            ];
        }
        return [];
    }

    async getFolderContent(folderId: number): Promise<{ folders: Folder[], files: File[] }> {
        if (folderId === 1) {
            return {
                folders: [
                    { id: 2, name: 'Child 1', parentId: 1, path: '/child1', createdAt: new Date(), updatedAt: new Date() }
                ],
                files: [
                    { id: 1, name: 'File 1', folderId: 1, size: 1024, mimeType: 'text/plain', createdAt: new Date(), updatedAt: new Date() }
                ]
            };
        }
        return { folders: [], files: [] };
    }
}

describe('FolderController', () => {
    let folderController: FolderController;
    let folderUseCase: FolderUseCase;
    let context: Context;

    beforeEach(() => {
        folderUseCase = new MockFolderUseCase();
        folderController = new FolderController(folderUseCase);
        context = {
            params: {},
            set: { status: 200 }
        } as unknown as Context;
    });

    test('getFolderTree should return folder tree', async () => {
        const response = await folderController.getFolderTree(context);
        expect(response.status).toBe('success');
        expect(response.data).toBeDefined();
        expect(response.data!).toHaveLength(1);
        expect(response.data![0].children).toHaveLength(1);
    });

    test('getFolderChildren should return folder children', async () => {
        context.params.id = '1';
        const response = await folderController.getFolderChildren(context);
        expect(response.status).toBe('success');
        expect(response.data).toHaveLength(1);
    });

    test('getFolderChildren should return empty array for folder with no children', async () => {
        context.params.id = '2';
        const response = await folderController.getFolderChildren(context);
        expect(response.status).toBe('success');
        expect(response.data).toHaveLength(0);
    });

    test('getFolderContent should return folders and files', async () => {
        context.params.id = '1';
        const response = await folderController.getFolderContent(context);
        expect(response.status).toBe('success');
        expect(response.data!.folders).toHaveLength(1);
        expect(response.data!.files).toHaveLength(1);
    });

    test('getFolderContent should return empty arrays for non-existent folder', async () => {
        context.params.id = '999';
        const response = await folderController.getFolderContent(context);
        expect(response.status).toBe('success');
        expect(response.data!.folders).toHaveLength(0);
        expect(response.data!.files).toHaveLength(0);
    });

    test('getFolderTree should handle errors', async () => {
        jest.spyOn(folderUseCase, 'getFolderTree').mockRejectedValue(new Error('Test error'));
        const response = await folderController.getFolderTree(context);
        expect(context.set.status).toBe(500);
        expect(response.status).toBe('error');
        expect(response.message).toBe('Failed to fetch folder tree');
    });

    test('getFolderChildren should handle errors', async () => {
        jest.spyOn(folderUseCase, 'getFolderChildren').mockRejectedValue(new Error('Test error'));
        context.params.id = '1';
        const response = await folderController.getFolderChildren(context);
        expect(context.set.status).toBe(500);
        expect(response.status).toBe('error');
        expect(response.message).toBe('Failed to fetch folder children');
    });

    test('getFolderContent should handle errors', async () => {
        jest.spyOn(folderUseCase, 'getFolderContent').mockRejectedValue(new Error('Test error'));
        context.params.id = '1';
        const response = await folderController.getFolderContent(context);
        expect(context.set.status).toBe(500);
        expect(response.status).toBe('error');
        expect(response.message).toBe('Failed to fetch folder content');
    });
});