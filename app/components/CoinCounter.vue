<template>
  <div class="counter">
    <div class="counter-value"> {{ formattedCoins }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  coins: {
    type: Number,
    required: true
  }
})

const formattedCoins = computed(function () {
  return Math.floor(props.coins)
})
</script>

<style scoped>
.counter {
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  height: auto;
  padding: 0;
  box-sizing: border-box;
  color: #f5e7c7;
  background: transparent;
}

.counter-value {
  width: 100%;
  font-size: var(--top-bar-text, 16px);
  font-weight: 800;
  line-height: 1;
  text-shadow: 1px 2px 2px #251203;
  white-space: nowrap;
  padding-left: clamp(24px, 6vw, 52px);
  font-size: 20px;
  padding-left: 50%;
}
</style>
