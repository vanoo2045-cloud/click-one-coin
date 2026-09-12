<template>
  <button
    class="mint-button clickable"
    :class="[coinColorClass, {
      'is-disabled': disabled,
      'is-sparking': sparksVisible
    }]"
    :disabled="disabled"
    @touchstart.passive="onTouchStart"
    @click="onClick"
  >
    <span class="spark-burst" aria-hidden="true">
      <i v-for="spark in 8" :key="spark"></i>
    </span>
  </button>


</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'

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
let sparkTimer = null
const sparksVisible = ref(false)

const coinColorClass = computed(() => {
  if (props.coins >= 10000) return 'coin-legendary'
  if (props.coins >= 100) return 'coin-epic'
  return 'coin-normal'
})

function fireMint() {
  if (props.disabled) {
    return
  }

  playSparks()
  emit('mint')
}

function playSparks() {
  sparksVisible.value = false
  clearTimeout(sparkTimer)

  nextTick(function () {
    sparksVisible.value = true
    sparkTimer = setTimeout(function () {
      sparksVisible.value = false
    }, 480)
  })
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

onBeforeUnmount(function () {
  clearTimeout(sparkTimer)
})
</script>

<style scoped>

.mint-button {
  position: relative;
  overflow: visible;
  background-image: url("/anvil3.png");
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

.spark-burst {
  position: absolute;
  top: 38%;
  left: 50%;
  z-index: 3;
  width: 0;
  height: 0;
  pointer-events: none;
}

.spark-burst i {
  --spark-x: 0px;
  --spark-y: -58px;
  position: absolute;
  width: clamp(4px, 1.2vw, 7px);
  aspect-ratio: 1;
  opacity: 0;
  background: linear-gradient(135deg, #fff9b0, #ffb21c 55%, #e65a0b);
  clip-path: polygon(50% 0, 63% 36%, 100% 50%, 63% 64%, 50% 100%, 37% 64%, 0 50%, 37% 36%);
  filter: drop-shadow(0 0 4px #ff8a00);
}

.mint-button.is-sparking .spark-burst i {
  animation: spark-flight 0.46s ease-out forwards;
}

.spark-burst i:nth-child(1) { --spark-x: -62px; --spark-y: -48px; }
.spark-burst i:nth-child(2) { --spark-x: -30px; --spark-y: -72px; animation-delay: 0.02s; }
.spark-burst i:nth-child(3) { --spark-x: 8px; --spark-y: -78px; animation-delay: 0.04s; }
.spark-burst i:nth-child(4) { --spark-x: 48px; --spark-y: -58px; animation-delay: 0.01s; }
.spark-burst i:nth-child(5) { --spark-x: 68px; --spark-y: -18px; animation-delay: 0.05s; }
.spark-burst i:nth-child(6) { --spark-x: 50px; --spark-y: 28px; animation-delay: 0.03s; }
.spark-burst i:nth-child(7) { --spark-x: -45px; --spark-y: 25px; animation-delay: 0.06s; }
.spark-burst i:nth-child(8) { --spark-x: -72px; --spark-y: -8px; animation-delay: 0.03s; }

@keyframes coinPop {
  0% { transform: scale(1); }
  30% { transform: scaleX(1.15) scaleY(0.85); }
  60% { transform: scaleX(0.92) scaleY(1.08); }
  100% { transform: scale(1); }
}

@keyframes spark-flight {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.25) rotate(0);
  }
  22% {
    opacity: 1;
    transform: translate(0, -8px) scale(1.15) rotate(45deg);
  }
  100% {
    opacity: 0;
    transform: translate(var(--spark-x), var(--spark-y)) scale(0.15) rotate(150deg);
  }
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
  box-shadow: 0 0 15px rgba(210, 199, 199, 0.712);
  background-color: rgba(218, 196, 196, 0.404);
}

.coin-epic {
  box-shadow: 0 0 15px rgba(206, 173, 90, 0.712);
  background-color: rgba(237, 173, 56, 0.404);
}

.coin-legendary {
  box-shadow: 0 0 15px rgba(204, 15, 15, 0.527);
  background-color: rgba(101, 5, 5, 0.433);
}

@media (prefers-reduced-motion: reduce) {
  .mint-button.is-sparking .spark-burst i {
    animation: none;
  }
}
</style>
