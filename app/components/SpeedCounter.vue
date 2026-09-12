<template>
  <div class="speed-counter">
    <div class="speed-value">{{ formattedSpeed }} м/сек</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  speed: {
    type: Number,
    required: true
  }
})

const formattedSpeed = computed(function () {
  return Number.isInteger(props.speed)
    ? props.speed
    : props.speed.toFixed(2)
})
</script>

<style scoped>
.speed-counter {
  backdrop-filter: blur(6px);
  background: rgba(18, 18, 18, 0.72);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
  box-sizing: border-box;
  color: #f5e7c7;
  width: 80px;
  height: 30px;
  min-width: 0;
  padding: 10px 14px;
}

.speed-label {
  font-size: 13px;
  margin-bottom: 2px;
  opacity: 0.85;
}

.speed-value {
  font-size: clamp(14px, 4vw, 18px);
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
}
</style>
