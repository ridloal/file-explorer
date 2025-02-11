<template>
  <div class="folder-content">
    <div class="folder-path">
      <button v-if="selectedFolderId" class="back-button" @click="handleBack">← Back</button>
      {{ currentPath }}
    </div>
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <div v-else class="folder-grid">
      <FolderItem
        v-for="folder in currentFolders"
        :key="folder.id"
        :folder="folder"
        :is-selected="selectedFolderId === folder.id"
        @select="handleSelect"
      />
      <FileItem v-for="file in currentFiles" :key="file.id" :file="file" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useFoldersStore } from '@/stores/folders'
import FolderItem from './FolderItem.vue'
import FileItem from './FileItem.vue'
import LoadingSpinner from '../shared/LoadingSpinner.vue'

const store = useFoldersStore()
const { loading, selectedFolderId, currentFolders, currentFiles } = storeToRefs(store)

const currentPath = computed(() =>
  selectedFolderId.value ? store.getCurrentPath(selectedFolderId.value) : 'No folder selected',
)

const handleSelect = (folderId: number) => {
  store.fetchFolderContent(folderId)
}

const handleBack = async () => {
  if (store.selectedFolder?.parentId) {
    await store.fetchFolderContent(store.selectedFolder.parentId)
  }
}
</script>

<style scoped>
.folder-content {
  height: 100%;
  overflow-y: auto;
}

.folder-path {
  padding: 10px 16px;
  background-color: #f1f1f1;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
}

.folder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
}

.back-button {
  padding: 4px 8px;
  margin-right: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.back-button:hover {
  background: #f5f5f5;
}
</style>
