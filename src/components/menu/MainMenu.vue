<script setup lang="ts">
  import type { CalculateElapsedPercentageFunction } from '@/utils/time.ts';
  import {
    FORMAT_EMPTY,
    FORMAT_DAY,
    FORMAT_DATE_DAY,
    FORMAT_DAY_DATE,
    FORMAT_DAY_OF_MONTH,
    FORMAT_DAY_OF_YEAR,
    FORMAT_WEEK_OF_YEAR,
    FORMAT_MONTH,
    FORMAT_DAY_MONTH_YEAR,
    FORMAT_YEAR_MONTH_DATE,
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
    { format: FORMAT_DAY, btnText: 'Day' },
    { format: FORMAT_DATE_DAY, btnText: 'Date and day' },
    { format: FORMAT_DAY_DATE, btnText: 'Day and date' },
    { format: FORMAT_DAY_OF_MONTH, btnText: 'Day of month' },
    { format: FORMAT_DAY_OF_YEAR, btnText: 'Day of year' },
    { format: FORMAT_WEEK_OF_YEAR, btnText: 'Week of year' },
    { format: FORMAT_MONTH, btnText: 'Month' },
    { format: FORMAT_DAY_MONTH_YEAR, btnText: 'dd-MM-yyyy' },
    { format: FORMAT_YEAR_MONTH_DATE, btnText: 'yyyy-MM-dd' }
  ];
</script>

<template>
  <div>
    <div>
      <fieldset class="button-list">
        <legend>Background colour</legend>
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
      </fieldset>
    </div>
    <div>
      <fieldset class="button-list">
        <legend>Clock progress bar</legend>
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
      </fieldset>
    </div>
    <div>
      <fieldset class="button-list">
        <legend>Bottom text</legend>
        <template v-for="formatItem in formatList" :key="formatItem.format">
          <button
            @click="$emit('onBottomTextFormatUpdate', formatItem.format)"
          >
            {{ formatItem.btnText }}
          </button>
        </template>
      </fieldset>
    </div>
    <div>
      <fieldset v-if="props.showWeekSetting" class="button-list">
        <legend>Week start day</legend>
        <template v-for="day in Day" :key="day">
          <button
            @click="$emit('onWeekStartUpdate', day)"
          >
            {{ day }}
          </button>
        </template>
      </fieldset>
    </div>
    <br/>
    <button
      @click="$emit('onClose')"
    >
      Close
    </button>
  </div>
</template>

<style scoped>

  fieldset {
    display: inline-flex;
  }

  .button-list {
    flex-wrap: wrap;
    gap: 0.25rem;
  }
</style>
