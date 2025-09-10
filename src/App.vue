<script setup lang="ts">
  import type { CalculateElapsedPercentageFunction } from '@/utils/time.ts';
  import { ref, computed, onBeforeUnmount } from 'vue';
  import MainMenu from '@/components/menu/MainMenu.vue';
  import ClockSvg from '@/components/ClockSvg.vue';
  import TimeText from '@/components/TimeText.vue';
  import PercentElapsedAnchorText from '@/components/PercentElapsedAnchorText.vue';
  import {
    FORMAT_TIME_24,
    FORMAT_EMPTY,
    Day,
    format,
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
  const dayToStartWeek = ref<Day>(Day.SUNDAY);

  const percentElapsedFn = ref<CalculateElapsedPercentageFunction>(getElapsedPercentageOfDay);
  const bottomTextFormat = ref(FORMAT_EMPTY);

  const percentElapsed = computed(() => percentElapsedFn.value.call(this, now.value, dayToStartWeek.value));
  const text = computed(() => format(now.value, FORMAT_TIME_24));
  const bottomText = computed(() => format(now.value, bottomTextFormat.value));
  const showWeekSetting = computed(() => percentElapsedFn.value === getElapsedPercentageOfWeek);

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
    <PercentElapsedAnchorText
      class="bottom-text"
      :text="bottomText"
      :textColour="fontColour"
      :percentElapsed="percentElapsed"
    ></PercentElapsedAnchorText>
  </div>
  <MainMenu
    id="menu"
    v-if="showMenu"
    :style="{ color: fontColour }"
    :showWeekSetting="showWeekSetting"
    @onFontColourUpdate="(newFontColour: string) => fontColour = newFontColour"
    @onBackgroundColourUpdate="(newBackgroundColour) => backgroundColour = newBackgroundColour"
    @onPercentElapsedFnUpdate="(newPercentElapsedFn) => percentElapsedFn = newPercentElapsedFn"
    @onBottomTextFormatUpdate="(newBottomTextFormat) => bottomTextFormat = newBottomTextFormat"
    @onWeekStartUpdate="(newWeekStart) => dayToStartWeek = newWeekStart"
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

  .bottom-text {
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
