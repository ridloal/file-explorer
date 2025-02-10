export interface File {
  id: number
  name: string
  folderId: number
  size: number
  mimeType: string
  type: 'file'
  createdAt: Date
  updatedAt: Date
}

export interface Folder {
  id: number
  name: string
  parentId: number | null
  path: string
  type: 'folder'
  children?: Folder[]
}

export type ExplorerItem = Folder | File
