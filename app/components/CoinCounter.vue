<template>
  <div class="counter">
    <div class="counter-label">Монета</div>
    <div class="counter-value">{{ formattedCoins }}</div>
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
  backdrop-filter: blur(6px);
  background: rgba(18, 18, 18, 0.72);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
  color: #f5e7c7;
  left: 16px;
  min-width: 120px;
  padding: 10px 14px;
  position: absolute;
  top: 16px;
  z-index: 5;
}

.counter-label {
  font-size: 13px;
  margin-bottom: 2px;
  opacity: 0.85;
}

.counter-value {
  font-size: 26px;
  font-weight: 800;
  line-height: 1;
}
</style>
