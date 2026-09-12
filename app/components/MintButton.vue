<template>
  <button
    class="mint-button clickable"
     :class="[coinColorClass, { 'is-disabled': disabled }]" 
    :disabled="disabled"
    @touchstart.passive="onTouchStart"
    @click="onClick"
  >
    
  </button>


</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  coins: {
    type: Number,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['mint'])

let lastTouchTime = 0

const coinColorClass = computed(() => {
  if (props.coins >= 10000) return 'coin-legendary'
  if (props.coins >= 100) return 'coin-epic'
  return 'coin-normal'
})

function fireMint() {
  if (props.disabled) {
    return
  }

  emit('mint')
}

function onTouchStart() {
  lastTouchTime = performance.now()
  fireMint()
}

function onClick() {
  const now = performance.now()
  if (now - lastTouchTime < 500) return
  fireMint()
}
</script>

<style scoped>

.mint-button {
  background-image: url("/click-one-coin/anvil3.png");
  background-size:contain;
  background-repeat: no-repeat;
  align-items: center;
  /* animation: floatGlow 2s ease-in-out infinite; */
  border: none;
  /* border-radius: 999px; */
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 28px;
  font-weight: 800;
  gap: 8px;
  height: 40vh;
  justify-content: center;
  transition: transform 0.06s ease;
  width: 25vh;
  margin-top: 15%;
  
}

.mint-button:active:not(:disabled) {
  animation: coinPop 0.2s ease-out;
  transform: scale(0.97);
}

.mint-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  animation: none;
}

.coin-emoji {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  font-size: 3rem;
}

@keyframes coinPop {
  0% { transform: scale(1); }
  30% { transform: scaleX(1.15) scaleY(0.85); }
  60% { transform: scaleX(0.92) scaleY(1.08); }
  100% { transform: scale(1); }
}

@keyframes floatGlow {
  0% {
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35), inset 0 4px 12px rgba(255, 255, 255, 0.35);
  }
  50% {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45), inset 0 6px 16px rgba(255, 255, 255, 0.5);
  }
  100% {
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35), inset 0 4px 12px rgba(255, 255, 255, 0.35);
  }
}

.coin-normal {
 background-image: url("C:\NuxtGame\click-one\public\anvil3.png") ;
   box-shadow: 0 0 15px rgba(210, 199, 199, 0.712);
  background-color: rgba(218, 196, 196, 0.404);
}

.coin-epic {
  background-image: url("C:\NuxtGame\click-one\public\anvil3.png") ;
     box-shadow: 0 0 15px rgba(206, 173, 90, 0.712);
  background-color: rgba(237, 173, 56, 0.404);
}

.coin-legendary {
  background-image: url("C:\NuxtGame\click-one\public\anvil3.png") ;
    box-shadow: 0 0 15px rgba(204, 15, 15, 0.527);
  background-color: rgba(101, 5, 5, 0.433);
}
</style>
