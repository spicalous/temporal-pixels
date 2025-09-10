<script setup lang="ts">
  import type { CalculateElapsedPercentageFunction } from '@/utils/time.ts';
  import {
    Weekday,
    formatWeekDays,
    emptyStr,
    getElapsedPercentageOfDay,
    getElapsedPercentageOfWeek,
    getElapsedPercentageOfMonth,
    getElapsedPercentageOfYear
  } from '@/utils/time.ts';

  const props = defineProps<{
    showWeekdaySetting: boolean
  }>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      @click="$emit('onPercentElapsedFnUpdate', getElapsedPercentageOfDay)"
    >
      Day
    </button>
    <button
      @click="$emit('onPercentElapsedFnUpdate', getElapsedPercentageOfWeek)"
    >
      Week
    </button>
    <button
      @click="$emit('onPercentElapsedFnUpdate', getElapsedPercentageOfMonth)"
    >
      Month
    </button>
    <button
      @click="$emit('onPercentElapsedFnUpdate', getElapsedPercentageOfYear)"
    >
      Year
    </button>
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
    <template v-if="props.showWeekdaySetting">
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
