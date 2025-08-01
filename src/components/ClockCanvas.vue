<script setup lang="ts">
  import { ref, useTemplateRef, onMounted, watch } from 'vue';
  import { CanvasWrapper } from '@/canvas-wrapper.ts';

  const props = defineProps<{
    backgroundColour: string,
    elapsedColour: string,
    percentElapsed: number
  }>();

  const canvasRef = useTemplateRef<HTMLCanvasElement>('ref-canvas');
  const canvasWrapper = ref<CanvasWrapper | null>(null);

  onMounted(() => {
    canvasWrapper.value = new CanvasWrapper(canvasRef.value!, window.innerWidth, window.innerHeight);
    canvasWrapper.value.clear(props.backgroundColour);
    canvasWrapper.value.setElapsed(props.elapsedColour, props.percentElapsed);
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
