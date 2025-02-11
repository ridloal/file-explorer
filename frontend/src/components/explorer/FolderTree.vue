<template>
  <div class="folder-tree">
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <template v-else>
      <div v-for="folder in folderTree" :key="folder.id">
        <FolderTreeItem
          :folder="folder"
          :level="0"
          :selected-id="selectedFolderId"
          @select="handleSelect"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useFoldersStore } from '@/stores/folders'
import FolderTreeItem from './FolderTreeItem.vue'
import LoadingSpinner from '../shared/LoadingSpinner.vue'

const store = useFoldersStore()
const { folderTree, loading, selectedFolderId } = storeToRefs(store)

const handleSelect = (folderId: number) => {
  store.fetchFolderContent(folderId)
}

onMounted(() => {
  store.fetchFolderTree()
})
</script>

<style scoped>
.folder-tree {
  height: 100%;
  padding: 16px;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
}

.folder-tree-item {
  margin-bottom: 4px;
}

.folder-children {
  margin-left: 20px;
}
</style>
