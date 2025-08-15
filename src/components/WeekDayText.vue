<script setup lang="ts">

  const props = defineProps<{
    text: string,
    textColour: string
  }>();
</script>

<template>
  <div class="text-container">
    <div class="text" :style="{ color: props.textColour }">
      {{ props.text }}
    </div>
  </div>
</template>

<style scoped>
  .text-container {
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
    position: absolute;
    bottom: 0;
    font-size: 2em;
  }
</style>
