<script setup lang="ts">
  import { ref, useTemplateRef, onMounted } from 'vue';
  import { CanvasWrapper } from '@/canvas-wrapper.ts';

  const BLACK = 'black';
  const WHITE = 'white';

  const canvasRef = useTemplateRef<HTMLCanvasElement>('ref-canvas');
  const canvasWrapper = ref<CanvasWrapper | null>(null);
  const showMenu = ref<boolean>(false);
  const fontColour = ref<string>(WHITE);

  onMounted(() => {
    canvasWrapper.value = new CanvasWrapper(canvasRef.value!);
    canvasWrapper.value.setDimensions(window.innerWidth, window.innerHeight);
    canvasWrapper.value.clear(BLACK);
  });
</script>

<template>
  <canvas
    ref="ref-canvas"
    @click="showMenu = true"
  ></canvas>
  <div
    v-if="showMenu && canvasWrapper"
    id="menu"
    :style="{ color: fontColour }"
  >
    <div>Background</div>
    <ul>
      <li
        @click="fontColour = BLACK; canvasWrapper.clear(WHITE);"
      >
        White
      </li>
      <li
        @click="fontColour = WHITE; canvasWrapper.clear(BLACK);"
      >
        Black
      </li>
    </ul>
    <div>TimeUnit</div>
    <ul>
      <li>Day</li>
      <li>Week</li>
      <li>Month</li>
      <li>Year</li>
    </ul>
    <div
      @click="showMenu = false"
    >
      Close
    </div>
  </div>
</template>

<style scoped>
  #menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
