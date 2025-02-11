const { Folder, FolderTree, File, FolderWithFiles } = require('./folder.entity');

test('Folder interface should have correct properties', () => {
    const folder = {
        id: 1,
        name: 'Test Folder',
        parentId: null,
        path: '/test-folder',
        createdAt: new Date(),
        updatedAt: new Date()
    };
    expect(folder).toHaveProperty('id');
    expect(folder).toHaveProperty('name');
    expect(folder).toHaveProperty('parentId');
    expect(folder).toHaveProperty('path');
    expect(folder).toHaveProperty('createdAt');
    expect(folder).toHaveProperty('updatedAt');
});

test('FolderTree interface should extend Folder and have children property', () => {
    const folderTree = {
        id: 1,
        name: 'Test Folder',
        parentId: null,
        path: '/test-folder',
        createdAt: new Date(),
        updatedAt: new Date(),
        children: []
    };
    expect(folderTree).toHaveProperty('id');
    expect(folderTree).toHaveProperty('name');
    expect(folderTree).toHaveProperty('parentId');
    expect(folderTree).toHaveProperty('path');
    expect(folderTree).toHaveProperty('createdAt');
    expect(folderTree).toHaveProperty('updatedAt');
    expect(folderTree).toHaveProperty('children');
    expect(Array.isArray(folderTree.children)).toBe(true);
});

test('File interface should have correct properties', () => {
    const file = {
        id: 1,
        name: 'Test File',
        folderId: 1,
        size: 1024,
        mimeType: 'text/plain',
        createdAt: new Date(),
        updatedAt: new Date()
    };
    expect(file).toHaveProperty('id');
    expect(file).toHaveProperty('name');
    expect(file).toHaveProperty('folderId');
    expect(file).toHaveProperty('size');
    expect(file).toHaveProperty('mimeType');
    expect(file).toHaveProperty('createdAt');
    expect(file).toHaveProperty('updatedAt');
});

test('FolderWithFiles interface should extend Folder and have files property', () => {
    const folderWithFiles = {
        id: 1,
        name: 'Test Folder',
        parentId: null,
        path: '/test-folder',
        createdAt: new Date(),
        updatedAt: new Date(),
        files: []
    };
    expect(folderWithFiles).toHaveProperty('id');
    expect(folderWithFiles).toHaveProperty('name');
    expect(folderWithFiles).toHaveProperty('parentId');
    expect(folderWithFiles).toHaveProperty('path');
    expect(folderWithFiles).toHaveProperty('createdAt');
    expect(folderWithFiles).toHaveProperty('updatedAt');
    expect(folderWithFiles).toHaveProperty('files');
    expect(Array.isArray(folderWithFiles.files)).toBe(true);
});