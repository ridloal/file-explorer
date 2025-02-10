<template>
  <div class="explorer">
    <div class="explorer-tree">
      <FolderTree />
    </div>
    <div class="explorer-content">
      <FolderContent />
    </div>
  </div>
</template>

<script setup lang="ts">
import FolderTree from '@/components/explorer/FolderTree.vue'
import FolderContent from '@/components/explorer/FolderContent.vue'
</script>

<style scoped>
.explorer {
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;
  background-color: #fafafa;
}

.explorer-tree {
  height: 100%;
  overflow-y: auto;
  background-color: #ffffff;
}

.explorer-content {
  height: 100%;
  overflow-y: auto;
}
</style>
