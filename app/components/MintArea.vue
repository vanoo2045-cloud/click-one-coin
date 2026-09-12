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
      <CoinCounter :coins="coins" />
      <SpeedCounter :speed="coinsPerSecond" />
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
import { ref, watch, onMounted } from 'vue'
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

watch(() => props.coins, () => {
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
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  z-index: 5;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 16px;
}

.mint-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}


</style>
