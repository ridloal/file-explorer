<template>
  <div class="folder-content">
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <template v-else>
      <div class="folder-grid">
        <FolderItem
          v-for="folder in currentFolderContent"
          :key="folder.id"
          :folder="folder"
          :is-selected="selectedFolderId === folder.id"
          @select="handleSelect"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFoldersStore } from '@/stores/folders'
import FolderItem from './FolderItem.vue'
import LoadingSpinner from '../shared/LoadingSpinner.vue'

const store = useFoldersStore()
const { currentFolderContent, loading, selectedFolderId } = storeToRefs(store)

const handleSelect = (folderId: number) => {
  store.fetchFolderContent(folderId)
}
</script>

<style scoped>
.folder-content {
  height: 100%;
  padding: 16px;
  background-color: #ffffff;
  overflow-y: auto;
}

.folder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  padding: 16px;
}
</style>
