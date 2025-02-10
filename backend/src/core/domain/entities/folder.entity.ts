export interface Folder {
    id: number;
    name: string;
    parentId: number | null;
    path: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface FolderTree extends Folder {
    children: FolderTree[];
}