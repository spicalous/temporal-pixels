<script setup lang="ts">
  import { computed, ref, useTemplateRef, onMounted, onBeforeUnmount, watch } from 'vue';

  const props = defineProps<{
    text: string,
    textColour: string,
    percentElapsed: number
  }>();

  const containerRef = useTemplateRef('container-element');
  const textRef = useTemplateRef('text-element');
  const textRightValue = ref(0);

  const dynamicTextStyles = computed(() => {
    return {
      color: props.textColour,
      width: `${props.percentElapsed * 100}%`
    };
  });

  function checkTextVisibility() {
    if (containerRef.value && textRef.value) {
      const containerRect = containerRef.value.getBoundingClientRect();
      const textRect = textRef.value.getBoundingClientRect();
      textRightValue.value = containerRect.width < textRect.width ? -1 * textRect.width : 0;
    }
  }

  let timeout: number | undefined;
  const debouncedCheckTextVisibility = function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      checkTextVisibility();
    }, 200);
  }

  onMounted(() => {
    window.addEventListener('resize', debouncedCheckTextVisibility);
    debouncedCheckTextVisibility();
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', debouncedCheckTextVisibility);
  });
  watch([() => props.text, () => props.percentElapsed],
    () => {
      checkTextVisibility();
    },
    { flush: 'post' }
  );
</script>

<template>
  <div class="container" :style="dynamicTextStyles" ref="container-element">
    <div class="text" ref="text-element" :style="{ bottom: 0, right: `${textRightValue}px` }">
      {{ props.text }}
    </div>
  </div>
</template>

<style scoped>
  .text {
    position: absolute;
    padding: 4px 10px;
    white-space: nowrap;
  }
</style>
