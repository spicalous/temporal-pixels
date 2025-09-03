<script setup lang="ts">
  import { ref, computed, onBeforeUnmount } from 'vue';
  import MainMenu from '@/components/menu/MainMenu.vue';
  import ClockSvg from '@/components/ClockSvg.vue';
  import TimeText from '@/components/TimeText.vue';
  import WeekDayText from '@/components/WeekDayText.vue';
  import {
    formatTime,
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
  const showWeekdaySetting = computed(() => percentElapsedFn.value === getElapsedPercentageOfWeek);

  const intervalId = setInterval(() => {
    now.value = new Date();
  }, 1000);

  onBeforeUnmount(() => {
    clearInterval(intervalId);
  });
</script>

<template>
  <div
    class="clock-container"
    @click="showMenu = true"
  >
    <ClockSvg
      :backgroundColour="backgroundColour"
      :elapsedColour="elapsedColour"
      :percentElapsed="percentElapsed"
    ></ClockSvg>
    <TimeText
      class="time-text"
      :text="text"
      :textColour="fontColour"
    ></TimeText>
    <WeekDayText
      class="weekday-text"
      :text="bottomText"
      :textColour="fontColour"
      :percentElapsed="percentElapsed"
    ></WeekDayText>
  </div>
  <MainMenu
    id="menu"
    v-if="showMenu"
    :style="{ color: fontColour }"
    :showWeekdaySetting="showWeekdaySetting"
    @onFontColourUpdate="(newFontColour: string) => fontColour = newFontColour"
    @onBackgroundColourUpdate="(newBackgroundColour) => backgroundColour = newBackgroundColour"
    @onPercentElapsedFnUpdate="(newPercentElapsedFn) => percentElapsedFn = newPercentElapsedFn"
    @onFormatBottomTextFnUpdate="(newFormatBottomTextFn) => formatBottomTextFn = newFormatBottomTextFn"
    @onClose="showMenu = false"
  >
  </MainMenu>
</template>

<style scoped>
  .clock-container {
    height: 100vh;
    width: 100vw;
  }

  .time-text {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
  }

  .weekday-text {
    height: 100vh;
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 2em;
  }

  #menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
