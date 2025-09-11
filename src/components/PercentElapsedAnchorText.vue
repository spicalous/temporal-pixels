<script setup lang="ts">
  import { computed, onBeforeUnmount } from 'vue';

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

  function checkTextVisibility() {
    console.log('resized');
  }

  let timeout: number | undefined;
  const debouncedCheckTextVisibility = function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      checkTextVisibility();
    }, 200);
  }

  window.addEventListener('resize', debouncedCheckTextVisibility);
  onBeforeUnmount(() => {
    window.removeEventListener('resize', debouncedCheckTextVisibility);
  });
</script>

<template>
  <div class="container" :style="dynamicTextStyles">
    <div class="text">
      {{ props.text }}
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    align-items: end;
    justify-content: end;
  }

  .text {
    padding: 4px 10px;
  }
</style>
