<script setup lang="ts">
  import { ref, computed, onBeforeUnmount } from 'vue';
  import ClockSvg from '@/components/ClockSvg.vue';
  import { formatTime, getElapsedPercentageOfDay, getElapsedPercentageOfWeek } from '@/utils/time.ts';

  const BLACK = 'black';
  const WHITE = 'white';
  const GREY = 'grey';

  const showMenu = ref<boolean>(false);
  const fontColour = ref<string>(WHITE);
  const backgroundColour = ref<string>(BLACK);
  const elapsedColour = ref<string>(GREY);
  const now = ref<Date>(new Date());

  const percentElapsedFn = ref(getElapsedPercentageOfDay);

  const percentElapsed = computed(() => percentElapsedFn.value.call(this, now.value));
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
    <button
      @click="percentElapsedFn = getElapsedPercentageOfDay"
    >
      Day
    </button>
    <button
      @click="percentElapsedFn = getElapsedPercentageOfWeek"
    >
      Week
    </button>
    <br/>
    <br/>
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
