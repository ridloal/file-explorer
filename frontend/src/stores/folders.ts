import { defineStore } from 'pinia'
import type { Folder, File } from '@/types/folder'

interface FolderState {
  folderTree: Folder[]
  currentFolders: Folder[]
  currentFiles: File[]
  selectedFolderId: number | null
  loading: boolean
  error: string | null
  selectedFolder: Folder | null
}

export const useFoldersStore = defineStore('folders', {
  state: (): FolderState => ({
    folderTree: [],
    currentFolders: [],
    currentFiles: [],
    selectedFolderId: null,
    selectedFolder: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchFolderTree() {
      this.loading = true
      try {
        const response = await fetch('http://localhost:3000/api/v1/folders')
        const data = await response.json()
        this.folderTree = data.data
      } catch (error) {
        this.error = 'Failed to fetch folder structure'
      } finally {
        this.loading = false
      }
    },

    findFolderInTree(folderId: number, tree: Folder[] = this.folderTree): Folder | null {
      for (const folder of tree) {
        if (folder.id === folderId) return folder
        if (folder.children) {
          const found = this.findFolderInTree(folderId, folder.children)
          if (found) return found
        }
      }
      return null
    },

    getCurrentPath(folderId: number): string {
      const folder = this.findFolderInTree(folderId)
      return folder?.path || ''
    },

    async fetchFolderContent(folderId: number) {
      this.loading = true
      try {
        const response = await fetch(`http://localhost:3000/api/v1/folders/${folderId}/content`)
        const data = await response.json()
        this.currentFolders = data.data.folders
        this.currentFiles = data.data.files
        this.selectedFolderId = folderId
        this.selectedFolder = this.findFolderInTree(folderId)
      } catch (error) {
        this.error = 'Failed to fetch folder content'
      } finally {
        this.loading = false
      }
    },
  },
})
