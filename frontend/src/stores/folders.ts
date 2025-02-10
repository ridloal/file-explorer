import { defineStore } from 'pinia'
import type { Folder, File } from '@/types/folder'

interface FolderState {
  folderTree: Folder[]
  currentFolders: Folder[]
  currentFiles: File[]
  selectedFolderId: number | null
  loading: boolean
  error: string | null
}

export const useFoldersStore = defineStore('folders', {
  state: (): FolderState => ({
    folderTree: [],
    currentFolders: [],
    currentFiles: [],
    selectedFolderId: null,
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

    getCurrentPath(folderId: number): string {
      const findPath = (folders: Folder[], id: number): string => {
        for (const folder of folders) {
          if (folder.id === id) return folder.path
          if (folder.children) {
            const childPath = findPath(folder.children, id)
            if (childPath) return childPath
          }
        }
        return ''
      }

      return findPath(this.folderTree, folderId)
    },

    async fetchFolderContent(folderId: number) {
      this.loading = true
      try {
        const response = await fetch(`http://localhost:3000/api/v1/folders/${folderId}/content`)
        const data = await response.json()
        this.currentFolders = data.data.folders
        this.currentFiles = data.data.files
        this.selectedFolderId = folderId
      } catch (error) {
        this.error = 'Failed to fetch folder content'
      } finally {
        this.loading = false
      }
    },
  },
})
