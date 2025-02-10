import { defineStore } from 'pinia'
import type { Folder } from '@/types/folder'

export const useFoldersStore = defineStore('folders', {
  state: () => ({
    folderTree: [] as Folder[],
    currentFolderContent: [] as Folder[],
    selectedFolderId: null as number | null,
    loading: false,
    error: null as string | null,
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

    async fetchFolderContent(folderId: number) {
      this.loading = true
      try {
        const response = await fetch(`http://localhost:3000/api/v1/folders/${folderId}/children`)
        const data = await response.json()
        this.currentFolderContent = data.data
        this.selectedFolderId = folderId
      } catch (error) {
        this.error = 'Failed to fetch folder content'
      } finally {
        this.loading = false
      }
    },
  },
});