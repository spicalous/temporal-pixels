<script setup lang="ts">
  import { ref, computed, onBeforeUnmount } from 'vue';
  import ClockSvg from '@/components/ClockSvg.vue';
  import { SECONDS_IN_A_DAY, formatTime, getElapsedSecondsOfDay } from '@/utils/time.ts';
  import { percentFloor } from '@/utils/math.ts';

  const BLACK = 'black';
  const WHITE = 'white';
  const GREY = 'grey';

  const showMenu = ref<boolean>(false);
  const fontColour = ref<string>(WHITE);
  const backgroundColour = ref<string>(BLACK);
  const elapsedColour = ref<string>(GREY);
  const now = ref<Date>(new Date());

  const percentElapsed = computed(() => {
    const elapsedSecondsOfDay = getElapsedSecondsOfDay(now.value);
    return percentFloor(elapsedSecondsOfDay, SECONDS_IN_A_DAY, 1000);
  });
  const text = computed(() => formatTime(now.value));

  const intervalId = setInterval(() => {
    now.value = new Date();
  }, 1000);

  onBeforeUnmount(() => {
    clearInterval(intervalId);
  });
</script>

<template>
  <ClockSvg
    :backgroundColour="backgroundColour"
    :elapsedColour="elapsedColour"
    :textColour="fontColour"
    :percentElapsed="percentElapsed"
    :text="text"
    :fontSize="'8em'"
    @click="showMenu = true"
  ></ClockSvg>
  <div
    v-if="showMenu"
    id="menu"
    :style="{ color: fontColour }"
  >
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
