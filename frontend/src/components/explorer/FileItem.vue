<template>
  <div class="file-item" @click="handleClick">
    <span class="file-icon">📄</span>
    <span class="file-name">{{ file.name }}</span>
    <span class="file-size">{{ formatFileSize(file.size) }}</span>
  </div>
</template>

<script setup lang="ts">
import type { File } from '@/types/folder'

defineProps<{
  file: File
}>()

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const handleClick = () => {
  // Implementasi preview file jika diperlukan
}
</script>

<style scoped>
.file-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
}

.file-item:hover {
  background-color: #f5f5f5;
}

.file-icon {
  font-size: 1.5em;
}

.file-name {
  flex: 1;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  font-size: 12px;
  color: #666;
}
</style>
