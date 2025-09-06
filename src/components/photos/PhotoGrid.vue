
<script setup lang="ts">
import { ref, computed } from 'vue'
import raw from '../../../photos/data'
import PhotoPreview from './PhotoPreview.vue'

const props = defineProps<{
  limit?: number
}>()

const photos = computed(() => {
  if (props.limit)
    return raw.slice(0, props.limit)
  return raw
})

const previewSrc = ref<string | null>(null)
const previewVisible = ref(false)
function openPreview(src: string) {
  previewSrc.value = src
  previewVisible.value = true
}
function closePreview() {
  previewVisible.value = false
}
</script>

<template>
  <div class="photos grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" max-w-500 mx-auto>
    <div v-for="photo, idx in photos" :key="idx" class="cursor-pointer">
      <img
        :src="photo.url"
        :alt="photo.text || photo.name"
        :data-photo-index="idx"
        loading="lazy"
        class="w-full aspect-square object-cover rounded shadow transition-transform duration-200 hover:scale-105"
        style="max-width: 160px; max-height: 160px;"
        @click="openPreview(photo.url)"
      >
    </div>
  </div>
  <PhotoPreview v-if="previewSrc" :src="previewSrc" :visible="previewVisible" @close="closePreview" />
</template>
