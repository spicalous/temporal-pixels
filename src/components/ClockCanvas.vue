<script setup lang="ts">
  import { ref, useTemplateRef, onMounted, watch } from 'vue';
  import { CanvasWrapper } from '@/canvas-wrapper.ts';

  const props = defineProps<{
    backgroundColour: string
  }>();

  const canvasRef = useTemplateRef<HTMLCanvasElement>('ref-canvas');
  const canvasWrapper = ref<CanvasWrapper | null>(null);

  onMounted(() => {
    canvasWrapper.value = new CanvasWrapper(canvasRef.value!);
    canvasWrapper.value.setDimensions(window.innerWidth, window.innerHeight);
    canvasWrapper.value.clear(props.backgroundColour);
  });

  watch(
    () => props.backgroundColour,
    (newBackgroundColour) => {
      if (canvasWrapper.value) {
        canvasWrapper.value.clear(newBackgroundColour);
      }
    }
  );
</script>

<template>
  <canvas
    ref="ref-canvas"
  ></canvas>
</template>
