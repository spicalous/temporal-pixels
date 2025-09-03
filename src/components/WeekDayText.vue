<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    text: string,
    textColour: string,
    percentElapsed: number
  }>();

  const dynamicTextStyles = computed(() => {
    return {
      color: props.textColour,
      width: `${props.percentElapsed * 100}%`
    };
  });
</script>

<template>
  <div class="weekday-container" :style="dynamicTextStyles">
    <div class="text">
      {{ props.text }}
    </div>
  </div>
</template>

<style scoped>
  .weekday-container {
    display: flex;
    align-items: end;
    justify-content: end;
  }

  .text {
    padding: 4px 10px;
  }
</style>
