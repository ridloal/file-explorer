<template>
    <div class="folder-tree-item">
      <div 
        class="folder-content"
        :class="{ selected: selectedId === folder.id }"
        :style="{ '--indent-level': level }"
        @click="handleClick"
      >
        <div class="folder-grid">
          <span v-if="hasChildren" class="toggle" @click.stop="toggleExpand">
            {{ isExpanded ? '▼' : '▶' }}
          </span>
          <span v-else class="spacer"></span>
          <span class="folder-icon">📁</span>
          <span class="folder-name">{{ folder.name }}</span>
        </div>
      </div>
      <div v-if="isExpanded && hasChildren" class="children">
        <FolderTreeItem
          v-for="child in folder.children"
          :key="child.id"
          :folder="child"
          :level="level + 1"
          :selected-id="selectedId"
          @select="$emit('select', $event)"
        />
      </div>
    </div>
  </template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Folder } from '@/types/folder'

const props = defineProps<{
  folder: Folder
  level: number
  selectedId: number | null
}>()

const emit = defineEmits<{
  (e: 'select', id: number): void
}>()

const hasChildren = computed(() => (props.folder.children ?? []).length > 0)

function checkIsInPath(folder: Folder, targetId: number | null): boolean {
  if (!targetId) return false
  if (folder.id === targetId) return true
  return folder.children?.some((child) => checkIsInPath(child, targetId)) ?? false
}

const isExpanded = ref(false)

const updateExpanded = () => {
  isExpanded.value =
    props.folder.id === props.selectedId ||
    (props.folder.children?.some((child) => checkIsInPath(child, props.selectedId)) ?? false)
}

watch(() => props.selectedId, updateExpanded)

onMounted(updateExpanded)

const handleClick = () => {
  emit('select', props.folder.id)
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.folder-tree-item {
  user-select: none;
}

.folder-content:hover {
  background-color: #f5f5f5;
}

.folder-content.selected {
  background-color: #e3f2fd;
}

.children {
  margin-left: 4px;
}

.folder-content {
  padding: 4px;
  cursor: pointer;
  margin-left: calc(var(--indent-level) * 20px);
}

.folder-grid {
  display: grid;
  grid-template-columns: 20px 24px 1fr;
  align-items: center;
  gap: 4px;
}

.toggle {
  cursor: pointer;
}

.spacer {
  width: 20px;
}
</style>
