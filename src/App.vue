<script setup lang="ts">
  import { ref, shallowRef, computed, onBeforeUnmount } from 'vue';
  import ClockCanvas from '@/components/ClockCanvas.vue';
  import ClockSvg from '@/components/ClockSvg.vue';
  import { SECONDS_IN_A_DAY, getElapsedSecondsOfDay } from '@/utils/time.ts';
  import { percentFloor } from '@/utils/math.ts';

  const BLACK = 'black';
  const WHITE = 'white';
  const GREY = 'grey';

  const showMenu = ref<boolean>(false);
  const componentType = shallowRef(ClockSvg);
  const fontColour = ref<string>(WHITE);
  const backgroundColour = ref<string>(BLACK);
  const elapsedColour = ref<string>(GREY);
  const now = ref<Date>(new Date());

  const percentElapsed = computed(() => {
    const elapsedSecondsOfDay = getElapsedSecondsOfDay(now.value);
    return percentFloor(elapsedSecondsOfDay, SECONDS_IN_A_DAY, 1000);
  });

  const intervalId = setInterval(() => {
    now.value = new Date();
  }, 1000);

  onBeforeUnmount(() => {
    clearInterval(intervalId);
  });
</script>

<template>
  <component :is="componentType"
    :backgroundColour="backgroundColour"
    :elapsedColour="elapsedColour"
    :percentElapsed="percentElapsed"
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
