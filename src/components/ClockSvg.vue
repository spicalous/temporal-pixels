<script setup lang="ts">

  const props = defineProps<{
    backgroundColour: string,
    elapsedColour: string,
    textColour: string,
    percentElapsed: number,
    text: string,
    bottomText: string
  }>();
</script>

<template>
  <div class="clock-container">
    <svg>
      <rect width="100%" height="100%" :fill="props.backgroundColour" />
      <rect :width="`${props.percentElapsed * 100}%`" height="100%" :fill="props.elapsedColour" />
    </svg>
    <div class="html-container">
      <div class="main-text" :style="{ color: textColour }">
        {{ text }}
      </div>
      <div class="bottom-text" :style="{ color: textColour }">
        {{ bottomText }}
      </div>
    </div>
  </div>
</template>

<style>
  .clock-container {
    height: 100vh;
    width: 100vw;
  }
  .html-container {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main-text {
    font-size: clamp(5em, 20vw, 20em);
  }
  .bottom-text {
    position: absolute;
    bottom: 0;
    font-size: 2em;
  }
</style>
