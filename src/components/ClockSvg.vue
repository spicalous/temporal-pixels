<script setup lang="ts">

  const props = defineProps<{
    backgroundColour: string
  }>();
</script>

<template>
  <svg>
    <rect width="100%" height="100%" :fill="props.backgroundColour" />
  </svg>
</template>
