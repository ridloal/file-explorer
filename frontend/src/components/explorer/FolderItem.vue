<template>
  <div class="folder-item" :class="{ selected: isSelected }" @click="selectFolder">
    <span class="folder-icon">📁</span>
    <span class="folder-name">{{ folder.name }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Folder } from '@/types/folder'

const props = defineProps<{
  folder: Folder
  isSelected: boolean
}>()

const emit = defineEmits<{
  (e: 'select', folderId: number): void
}>()

const selectFolder = () => {
  emit('select', props.folder.id)
}
</script>

<style scoped>
.folder-item {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
}

.folder-item:hover {
  background-color: #f5f5f5;
}

.folder-item.selected {
  background-color: #e3f2fd;
}

.folder-icon {
  font-size: 1.2em;
}

.folder-name {
  font-size: 14px;
}
</style>
