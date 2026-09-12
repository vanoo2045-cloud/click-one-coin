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
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  min-width: 0;
  height: auto;
  padding: 0;
  box-sizing: border-box;
  color: #f5e7c7;
  background: transparent;
}

.speed-value {
  max-width: 100%;
  font-size: var(--top-bar-text, 16px);
  font-weight: 800;
  line-height: 1;
  text-align: right;
  text-shadow: 1px 2px 2px #251203;
  white-space: nowrap;
  font-size: 20px;
  padding-right: 50%;
}
</style>
