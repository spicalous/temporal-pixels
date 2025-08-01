<script setup lang="ts">
  import { ref, shallowRef } from 'vue';
  import ClockCanvas from '@/components/ClockCanvas.vue';
  import ClockSvg from '@/components/ClockSvg.vue';

  const BLACK = 'black';
  const WHITE = 'white';

  const showMenu = ref<boolean>(false);
  const componentType = shallowRef(ClockSvg);
  const fontColour = ref<string>(WHITE);
  const backgroundColour = ref<string>(BLACK);

</script>

<template>
  <component :is="componentType"
    :backgroundColour="backgroundColour"
    @click="showMenu = true"
  ></component>
  <div
    v-if="showMenu"
    id="menu"
    :style="{ color: fontColour }"
  >
    <button
      @click="componentType = ClockCanvas"
    >
      Canvas
    </button>
    <button
      @click="componentType = ClockSvg"
    >
      SVG
    </button>
    <div>Background</div>
    <button
      @click="fontColour = BLACK; backgroundColour = WHITE;"
    >
      White
    </button>
    <button
      @click="fontColour = WHITE; backgroundColour = BLACK;"
    >
      Black
    </button>
    <div>Clock</div>
    <ul>
      <li>Day</li>
      <li>Week</li>
      <li>Month</li>
      <li>Year</li>
    </ul>
    <button
      @click="showMenu = false"
    >
      Close
    </button>
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
