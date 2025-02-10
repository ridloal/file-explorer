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

export interface File {
    id: number;
    name: string;
    folderId: number;
    size: number;
    mimeType: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface FolderWithFiles extends Folder {
    files?: File[];
  }