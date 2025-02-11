<template>
  <div class="folder-tree-item" :style="{ paddingLeft: `${level * 20}px` }">
    <div
      class="folder-content"
      :class="{ selected: selectedId === folder.id }"
      @click="handleClick"
    >
      <span class="toggle" v-if="hasChildren" @click.stop="toggleExpand">
        {{ isExpanded ? '▼' : '▶' }}
      </span>
      <span class="folder-icon">📁</span>
      <span class="folder-name">{{ folder.name }}</span>
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

.folder-content {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  cursor: pointer;
}

.folder-content:hover {
  background-color: #f5f5f5;
}

.folder-content.selected {
  background-color: #e3f2fd;
}

.toggle {
  width: 20px;
  cursor: pointer;
}

.children {
  margin-left: 4px;
}
</style>
