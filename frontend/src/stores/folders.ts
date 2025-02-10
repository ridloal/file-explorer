import { defineStore } from 'pinia';

interface Folder {
  id: number;
  name: string;
  parentId: number | null;
  path: string;
}

export const useFoldersStore = defineStore('folders', {
  state: () => ({
    folders: [] as Folder[],
    selectedFolderId: null as number | null,
    loading: false,
    error: null as string | null,
  }),
  
  actions: {
    async fetchFolders() {
      this.loading = true;
      try {
        const response = await fetch('http://localhost:3000/api/v1/folders');
        const data = await response.json();
        this.folders = data;
      } catch (error) {
        this.error = 'Failed to fetch folders';
      } finally {
        this.loading = false;
      }
    },
  },
});