<script setup lang="ts">

  const props = defineProps<{
    text: string,
    textColour: string
  }>();
</script>

<template>
  <div class="time-container">
    <div class="text" :style="{ color: props.textColour }">
      {{ props.text }}
    </div>
  </div>
</template>

<style scoped>
  .time-container {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    font-size: clamp(5em, 20vw, 20em);
  }
</style>
