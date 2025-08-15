<script setup lang="ts">

  const props = defineProps<{
    backgroundColour: string,
    elapsedColour: string,
    percentElapsed: number
  }>();
</script>

<template>
  <svg>
    <rect width="100%" height="100%" :fill="props.backgroundColour" />
    <rect :width="`${props.percentElapsed * 100}%`" height="100%" :fill="props.elapsedColour" />
  </svg>
</template>
