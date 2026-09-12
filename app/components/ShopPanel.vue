<template>
  <section class="bottom-zone">
   
     
      <div class="shop-list">

      
        <button
          type="button"
          class="shop-button upgrade_coin"
          :class="{ 'is-animating': animatedButton === 'iron' }"
          :disabled="coins < ironCost"
          @click="animateAndEmit('iron', 'buy-iron')"
        >
      
        </button>

        <!-- <button
          class="shop-button"
          :disabled="coins < bronzeCost"
          @click="$emit('buy-bronze')"
        >
          <span class="shop-name">Купить бронзовую монету</span>
          <span class="shop-meta">+15% к скорости · {{ bronzeCost }} монет</span>
        </button>

        <button
          class="shop-button"
          :disabled="coins < silverCost"
          @click="$emit('buy-silver')"
        >
          <span class="shop-name">Купить серебряную монету</span>
          <span class="shop-meta">+25% к скорости · {{ silverCost }} монет</span>
        </button> -->

        <button
          type="button"
          class="shop-button upgrade_hammer"
          :class="{ 'is-animating': animatedButton === 'hammer' }"
          :disabled="coins < hammerCost"
          @click="animateAndEmit('hammer', 'upgrade-hammer')"
        >
        </button>
      </div>

 
   
  </section>
</template>

<script setup>
import { nextTick, onBeforeUnmount, ref } from 'vue'

defineProps({
  coins: {
    type: Number,
    required: true
  },
  ironCount: {
    type: Number,
    required: true
  },
  bronzeCount: {
    type: Number,
    required: true
  },
  silverCount: {
    type: Number,
    required: true
  },
  hammerLevel: {
    type: Number,
    required: true
  },
  clickPower: {
    type: Number,
    required: true
  },
  speedPercent: {
    type: Number,
    required: true
  },
  ironCost: {
    type: Number,
    required: true
  },
  bronzeCost: {
    type: Number,
    required: true
  },
  silverCost: {
    type: Number,
    required: true
  },
  hammerCost: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['buy-iron', 'buy-bronze', 'buy-silver', 'upgrade-hammer'])

const animatedButton = ref('')
let animationTimer = null

function animateAndEmit(button, event) {
  animatedButton.value = ''
  emit(event)

  nextTick(function () {
    animatedButton.value = button
    clearTimeout(animationTimer)
    animationTimer = setTimeout(function () {
      animatedButton.value = ''
    }, 420)
  })
}

onBeforeUnmount(function () {
  clearTimeout(animationTimer)
})
</script>

<style scoped>

button {
  background-color: transparent;
}





.panel-title {
  color: #f6ead2;
  font-size: 24px;
  margin: 0 0 16px;
}

.shop-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.shop-button {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transform-origin: center;
  transition:
    transform 0.16s ease,
    filter 0.16s ease,
    box-shadow 0.16s ease,
    opacity 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.shop-button::after {
  position: absolute;
  inset: 0;
  content: '';
  pointer-events: none;
  background: radial-gradient(circle at center, rgba(255, 239, 166, 0.5), transparent 58%);
  opacity: 0;
  transform: scale(0.7);
}

.shop-button::before {
  position: absolute;
  top: -35%;
  bottom: -35%;
  left: -45%;
  z-index: 2;
  width: 24%;
  content: '';
  pointer-events: none;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 244, 190, 0.75),
    transparent
  );
  opacity: 0;
  transform: skewX(-18deg);
}

@media (hover: hover) {
  .shop-button:hover:not(:disabled) {
    filter: brightness(1.08) saturate(1.06);
    transform: translateY(-2px) scale(1.015);
    box-shadow: 0 8px 16px rgba(40, 24, 9, 0.28);
  }
}

.shop-button:active:not(:disabled) {
  transform: translateY(2px) scale(0.975);
  filter: brightness(1.15);
}

.shop-button.is-animating {
  animation: shop-button-press 0.4s cubic-bezier(0.2, 0.9, 0.25, 1.25);
}

.shop-button.is-animating::before {
  animation: shop-button-shine 0.38s ease-out;
}

.shop-button.is-animating::after {
  animation: shop-button-flash 0.38s ease-out;
}

.shop-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.shop-name {
  font-size: 16px;
  font-weight: 800;
}

.shop-meta {
  font-size: 13px;
  opacity: 0.8;
}

.stats {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  color: #f6ead2;
  font-size: 14px;
  line-height: 1.7;
  margin-top: 18px;
  padding: 14px;
}

.upgrade_coin {
  background-image: url("/click-one-coin/ee.png");
background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  width: 400px;
  height: 100px;
  

     /* background: #f2e3c2; */
  border: none;
  border-radius: 16px;
  color: #2b2117;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 64px;

  text-align: left;
  

}

.upgrade_hammer {
  background-image: url("/click-one-coin/rr.png");
 background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  width: 400px;
  height: 100px;
  

     /* background: #f2e3c2; */
  border: none;
  border-radius: 16px;
  color: #2b2117;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 64px;

  text-align: left;
  

}



@keyframes shop-button-press {
  0% {
    transform: translateY(0) scale(1);
  }
  30% {
    transform: translateY(4px) scale(0.955) rotate(-0.7deg);
  }
  62% {
    transform: translateY(-3px) scale(1.035) rotate(0.45deg);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

@keyframes shop-button-flash {
  0% {
    opacity: 0;
    transform: scale(0.7);
  }
  35% {
    opacity: 0.7;
  }
  100% {
    opacity: 0;
    transform: scale(1.25);
  }
}

@keyframes shop-button-shine {
  0% {
    left: -45%;
    opacity: 0;
  }
  20% {
    opacity: 0.9;
  }
  100% {
    left: 125%;
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .shop-button {
    transition: none;
  }

  .shop-button.is-animating,
  .shop-button.is-animating::before,
  .shop-button.is-animating::after {
    animation: none;
  }
}

</style>
