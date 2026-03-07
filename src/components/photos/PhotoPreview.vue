<script setup lang="ts">
const props = defineProps<{
  src: string | null
  visible: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

function onBackdropClick() {
  emit('close')
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="visible && props.src"
      class="fixed inset-0 z-200 flex items-center justify-center bg-black/70 p-4"
      @click="onBackdropClick"
    >
      <img
        :src="props.src"
        alt="preview"
        class="max-h-[90vh] max-w-[90vw] rounded shadow-2xl"
        @click.stop
      >
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
