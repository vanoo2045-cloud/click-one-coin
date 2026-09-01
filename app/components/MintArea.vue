<template>
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

    <CoinCounter :coins="coins" />

    <div class="mint-wrap">
      <MintButton
        :coins="coins"
        :disabled="!gameStarted || victoryVisible"
        @mint="handleMint"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import CoinCounter from './CoinCounter.vue'
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
  }
})

const emit = defineEmits(['mint'])

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
  min-height: 50dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-image: url("/FD8E1E8C-920A-4D33-93D6-8C86466D501F.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.mint-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
</style>
