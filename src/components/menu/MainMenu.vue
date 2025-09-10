<script setup lang="ts">
  import type { CalculateElapsedPercentageFunction } from '@/utils/time.ts';
  import {
    FORMAT_EMPTY,
    FORMAT_DAY,
    FORMAT_DATE_DAY,
    FORMAT_DAY_DATE,
    Day,
    getElapsedPercentageOfDay,
    getElapsedPercentageOfWeek,
    getElapsedPercentageOfMonth,
    getElapsedPercentageOfYear
  } from '@/utils/time.ts';

  const props = defineProps<{
    showWeekSetting: boolean
  }>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const emit = defineEmits<{
    (e: 'onFontColourUpdate', newFontColour: string): void
    (e: 'onBackgroundColourUpdate', newBackgroundColour: string): void
    (e: 'onPercentElapsedFnUpdate', newPercentElapsedFn: CalculateElapsedPercentageFunction): void
    (e: 'onBottomTextFormatUpdate', newBottomTextFormat: string): void
    (e: 'onWeekStartUpdate', day: Day): void
    (e: 'onClose'): void
  }>();

  const BLACK = 'black';
  const WHITE = 'white';

  const formatList = [
    { format: FORMAT_EMPTY, btnText: 'Hide' },
    { format: FORMAT_DAY, btnText: 'Show day' },
    { format: FORMAT_DATE_DAY, btnText: 'Show date and day' },
    { format: FORMAT_DAY_DATE, btnText: 'Show day and date' }
  ];
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
    <div>Bottom text</div>
    <template v-for="formatItem in formatList" :key="formatItem.format">
      <button
        @click="$emit('onBottomTextFormatUpdate', formatItem.format)"
      >
        {{ formatItem.btnText }}
      </button>
    </template>
    <template v-if="props.showWeekSetting">
      <div>Week start day</div>
      <template v-for="day in Day" :key="day">
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
