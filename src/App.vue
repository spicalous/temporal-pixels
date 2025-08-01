<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import ClockCanvas from '@/components/ClockCanvas.vue';

  const BLACK = 'black';
  const WHITE = 'white';

  const showMenu = ref<boolean>(false);
  const fontColour = ref<string>(WHITE);
  const backgroundColour = ref<string>(BLACK);

</script>

<template>
  <ClockCanvas
    :backgroundColour="backgroundColour"
    @click="showMenu = true"
  />
  <div
    v-if="showMenu"
    id="menu"
    :style="{ color: fontColour }"
  >
    <div>Background</div>
    <ul>
      <li
        @click="fontColour = BLACK; backgroundColour = WHITE;"
      >
        White
      </li>
      <li
        @click="fontColour = WHITE; backgroundColour = BLACK;"
      >
        Black
      </li>
    </ul>
    <div>Clock</div>
    <ul>
      <li>Day</li>
      <li>Week</li>
      <li>Month</li>
      <li>Year</li>
    </ul>
    <div
      @click="showMenu = false"
    >
      Close
    </div>
  </div>
</template>

<style scoped>
  #menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
