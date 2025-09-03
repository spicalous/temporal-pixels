<script setup lang="ts">
  import type { CalculateElapsedPercentageFunction } from '@/utils/time.ts';
  import {
    Weekday,
    formatWeekDays,
    emptyStr,
    getElapsedPercentageOfDay,
    getElapsedPercentageOfWeek
  } from '@/utils/time.ts';

  const props = defineProps<{
    showWeekdaySetting: boolean
  }>();

  const emit = defineEmits<{
    (e: 'onFontColourUpdate', newFontColour: string): void
    (e: 'onBackgroundColourUpdate', newBackgroundColour: string): void
    (e: 'onPercentElapsedFnUpdate', newPercentElapsedFn: CalculateElapsedPercentageFunction): void
    (e: 'onFormatBottomTextFnUpdate', newFormatBottomTextFn: (date: Date) => string): void
    (e: 'onWeekStartUpdate', day: Weekday): void
    (e: 'onClose'): void
  }>();

  const BLACK = 'black';
  const WHITE = 'white';

  function setClockTypeDay() {
    emit('onPercentElapsedFnUpdate', getElapsedPercentageOfDay);
    emit('onFormatBottomTextFnUpdate', emptyStr);
  }
</script>

<template>
  <div>
    <div>Background colour</div>
    <button
      @click="$emit('onFontColourUpdate', BLACK); $emit('onBackgroundColourUpdate', WHITE);"
    >
      White
    </button>
    <button
      @click="$emit('onFontColourUpdate', WHITE); $emit('onBackgroundColourUpdate', BLACK);"
    >
      Black
    </button>
    <div>Clock progress bar</div>
    <button
      @click="setClockTypeDay"
    >
      Day
    </button>
    <button
      @click="$emit('onPercentElapsedFnUpdate', getElapsedPercentageOfWeek)"
    >
      Week
    </button>
    <template v-if="props.showWeekdaySetting">
      <div>Weekdays</div>
      <button
        @click="$emit('onFormatBottomTextFnUpdate', emptyStr)"
      >
        Hide
      </button>
      <button
        @click="$emit('onFormatBottomTextFnUpdate', formatWeekDays)"
      >
        Show
      </button>
      <div>Week start day</div>
      <template v-for="day in Weekday" :key="day">
        <button
          @click="$emit('onWeekStartUpdate', day)"
        >
          {{ day }}
        </button>
      </template>
    </template>
    <br/>
    <br/>
    <button
      @click="$emit('onClose')"
    >
      Close
    </button>
  </div>
</template>
