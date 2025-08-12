<script setup lang="ts">
  import { ref, computed, onBeforeUnmount } from 'vue';
  import ClockSvg from '@/components/ClockSvg.vue';
  import {
   formatTime,
   formatWeekDays,
   emptyStr,
   getElapsedPercentageOfDay,
   getElapsedPercentageOfWeek
 } from '@/utils/time.ts';

  const BLACK = 'black';
  const WHITE = 'white';
  const GREY = 'grey';

  const showMenu = ref<boolean>(false);
  const fontColour = ref<string>(WHITE);
  const backgroundColour = ref<string>(BLACK);
  const elapsedColour = ref<string>(GREY);
  const now = ref<Date>(new Date());

  const percentElapsedFn = ref(getElapsedPercentageOfDay);
  const formatBottomTextFn = ref(emptyStr);

  const percentElapsed = computed(() => percentElapsedFn.value.call(this, now.value));
  const text = computed(() => formatTime(now.value));
  const bottomText = computed(() => formatBottomTextFn.value.call(this, now.value));

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
    :bottomText="bottomText"
    @click="showMenu = true"
  ></ClockSvg>
  <div
    v-if="showMenu"
    id="menu"
    :style="{ color: fontColour }"
  >
    <div>Background colour</div>
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
    <div>Clock progress bar</div>
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
    <div>Weekdays</div>
    <button
      @click="formatBottomTextFn = emptyStr"
    >
      Hide
    </button>
    <button
      @click="formatBottomTextFn = formatWeekDays"
    >
      Show
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
