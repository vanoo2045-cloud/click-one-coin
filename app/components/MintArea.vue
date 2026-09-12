<template>

 <div class="background">
  <section class="top-zone">
    <GreetingModal
      v-if="!gameStarted"
      @started="onGameStarted"
    />

    <DialogueModal
      :trigger-amount="coins"
      :dialogues="dialoguesList"
      :enabled="gameStarted && !victoryVisible"
      @opened="dialogueOpen = true"
      @closed="onDialogueClosed"
    />

    <VictoryModal
      :visible="victoryVisible"
      @close="onVictoryClosed"
    />

    <div class="top-bar">
      <CoinCounter class="top-bar-coins" :coins="coins" />

      <div class="level-panel">
        <div class="level-title">МОНЕТНЫЙ ДВОР — УР. 1</div>
        <div class="progress-frame">
          <div
            class="progress-fill"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>
      </div>

      <SpeedCounter class="top-bar-speed" :speed="coinsPerSecond" />
    </div>

    <MintButton
        :coins="coins"
        :disabled="!gameStarted || victoryVisible"
        @mint="handleMint"
      />
    

  

       <ShopPanel
      :coins="coins"
      :iron-count="ironCount"
      :bronze-count="bronzeCount"
      :silver-count="silverCount"
      :hammer-level="hammerLevel"
      :click-power="clickPower"
      :speed-percent="speedPercent"
      :iron-cost="ironCost"
      :bronze-cost="bronzeCost"
      :silver-cost="silverCost"
      :hammer-cost="hammerCost"
      @buy-iron="emit('buy-iron')"
      @buy-bronze="emit('buy-bronze')"
      @buy-silver="emit('buy-silver')"
      @upgrade-hammer="emit('upgrade-hammer')"
    />
 
  </section>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import CoinCounter from './CoinCounter.vue'
import SpeedCounter from './SpeedCounter.vue'
import MintButton from './MintButton.vue'
import GreetingModal from './GreetingModal.vue'
import DialogueModal from './DialogueModal.vue'
import VictoryModal from './VictoryModal.vue'

import dialoguesData from '~/data/dialogues.json'

const VICTORY_THRESHOLD = 20000

const props = defineProps({
  coins: {
    type: Number,
    required: true
  },
  coinsPerSecond: {
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

const emit = defineEmits([
  'mint',
  'buy-iron',
  'buy-bronze',
  'buy-silver',
  'upgrade-hammer'
])

const highestCoinsReached = ref(props.coins)

const progressPercent = computed(function () {
  return Math.min(100, Math.max(0, highestCoinsReached.value / VICTORY_THRESHOLD * 100))
})

const dialoguesList = ref([])
const gameStarted = ref(false)
const dialogueOpen = ref(false)
const victoryVisible = ref(false)
const victoryShown = ref(false)
const pendingVictory = ref(false)

onMounted(() => {
  if (dialoguesData?.dialogues) {
    dialoguesList.value = dialoguesData.dialogues
  }
})

function onGameStarted() {
  gameStarted.value = true
  tryShowVictory()
}

function tryShowVictory() {
  if (victoryShown.value || props.coins < VICTORY_THRESHOLD) {
    return
  }

  if (!gameStarted.value || dialogueOpen.value) {
    pendingVictory.value = true
    return
  }

  pendingVictory.value = false
  victoryVisible.value = true
  victoryShown.value = true
}

function onDialogueClosed() {
  dialogueOpen.value = false

  if (pendingVictory.value) {
    tryShowVictory()
  }
}

function onVictoryClosed() {
  victoryVisible.value = false
}

function handleMint() {
  if (!gameStarted.value || victoryVisible.value) {
    return
  }

  emit('mint')
}

watch(() => props.coins, (coins) => {
  if (coins > highestCoinsReached.value) {
    highestCoinsReached.value = coins
  }

  tryShowVictory()
})
</script>

<style scoped>


.top-zone {
  position: relative;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  /* background-image: url("/FD8E1E8C-920A-4D33-93D6-8C86466D501F.jpeg"); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.top-bar {
  --top-bar-text: clamp(10px, 2vw, 18px);
  position: absolute;
  top: clamp(8px, 2vw, 24px);
  left: 50%;
  z-index: 5;
  isolation: isolate;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2.4fr) minmax(0, 1.15fr);
  align-items: center;
  gap: clamp(4px, 2vw, 20px);
  width: min(960px, calc(100% - 16px));
  min-height: 74px;
  aspect-ratio: 990 / 154;
  padding: clamp(12px, 2.4vw, 26px) clamp(22px, 6vw, 68px);
  transform: translateX(-50%);
  overflow: hidden;
}

.top-bar::before {
  position: absolute;
  inset: 0;
  z-index: 0;
  content: '';
  pointer-events: none;
  background: url('/rreeaa1.png') center / 100% 100% no-repeat;
}

.top-bar > * {
  position: relative;
  z-index: 2;
}

.top-bar-coins,
.top-bar-speed,
.level-panel {
  min-width: 0;
}

.top-bar-coins {
  justify-self: start;
}

.top-bar-speed {
  justify-self: end;
}

.level-panel {
  display: grid;
  align-content: center;
  justify-items: center;
  gap: clamp(3px, 0.8vw, 8px);
  width: 100%;
}

.level-title {
  width: 100%;
  overflow: hidden;
  color: #f5e7c7;
  font-size: clamp(7px, 1.55vw, 16px);
  font-weight: 800;
  line-height: 1.1;
  text-align: center;
  text-overflow: ellipsis;
  text-shadow: 1px 2px 2px #251203;
  white-space: nowrap;
}

.progress-frame {
  position: relative;
  isolation: isolate;
  width: min(86%, 390px);
  height: clamp(9px, 1.7vw, 16px);
  overflow: visible;
  border: clamp(2px, 0.35vw, 3px) solid transparent;
  border-radius: 0;
  background:
    linear-gradient(180deg, #4b2a10 0%, #1a0b03 100%) padding-box,
    linear-gradient(180deg, #f0ad68 0%, #a95322 42%, #5b240d 72%, #d6813c 100%) border-box;
  box-shadow:
    inset 0 2px 2px rgba(255, 217, 148, 0.38),
    inset 0 -3px 3px rgba(0, 0, 0, 0.8),
    0 3px 0 #3a1608,
    0 7px 10px rgba(0, 0, 0, 0.55);
}

.progress-frame::before,
.progress-frame::after {
  position: absolute;
  top: 50%;
  z-index: 3;
  width: clamp(8px, 1.5vw, 13px);
  aspect-ratio: 1;
  content: '';
  pointer-events: none;
  border: 1px solid #4a1c08;
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 30%,
    #ffe0a0 0 9%,
    #d7823c 20%,
    #8a3d17 55%,
    #391506 82%
  );
  box-shadow:
    inset -1px -2px 2px rgba(35, 10, 2, 0.75),
    inset 1px 1px 1px rgba(255, 210, 128, 0.55),
    0 2px 3px rgba(0, 0, 0, 0.7);
  transform: translateY(-50%);
}

.progress-frame::before {
  left: clamp(-8px, -1vw, -5px);
}

.progress-frame::after {
  right: clamp(-8px, -1vw, -5px);
}

.progress-fill {
  width: 0;
  height: 100%;
  border-radius: 0;
  background:
    linear-gradient(180deg, rgba(154, 225, 255, 0.75) 0%, transparent 45%),
    repeating-linear-gradient(135deg, #159cff 0 8px, #0871d0 8px 16px);
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.75),
    inset 0 -2px rgba(0, 40, 100, 0.55),
    2px 0 5px rgba(46, 170, 255, 0.65);
  transition: width 0.25s ease-out;
}

@media (max-width: 480px) {
  .top-bar {
    --top-bar-text: clamp(10px, 3.4vw, 14px);
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 2fr) minmax(0, 1.05fr);
    min-height: 70px;
    padding-inline: 24px;
  }
}

.mint-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}


</style>
