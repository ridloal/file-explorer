export interface Folder {
  id: number
  name: string
  parentId: number | null
  path: string
  children?: Folder[]
}
