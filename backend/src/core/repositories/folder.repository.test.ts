import { FolderRepository } from './folder.repository';
import { Folder, FolderTree } from '../domain/entities/folder.entity';

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

describe('FolderRepository', () => {
    let repository: FolderRepository;

    beforeEach(() => {
        repository = new MockFolderRepository();
    });

    test('findAll should return all folders', async () => {
        const folders = await repository.findAll();
        expect(folders).toHaveLength(3);
    });

    test('findById should return the correct folder', async () => {
        const folder = await repository.findById(1);
        expect(folder).not.toBeNull();
        expect(folder?.id).toBe(1);
    });

    test('findById should return null for non-existent folder', async () => {
        const folder = await repository.findById(999);
        expect(folder).toBeNull();
    });

    test('findChildren should return the correct children', async () => {
        const children = await repository.findChildren(1);
        expect(children).toHaveLength(2);
    });

    test('findChildren should return an empty array for folder with no children', async () => {
        const children = await repository.findChildren(3);
        expect(children).toHaveLength(0);
    });

    test('getTree should return the correct folder tree', async () => {
        const tree = await repository.getTree();
        expect(tree).toHaveLength(1);
        expect(tree[0].children).toHaveLength(2);
    });
});