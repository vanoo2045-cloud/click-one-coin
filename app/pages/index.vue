<template>
  <main class="page">
    <MintArea
      :coins="coins"
      :coins-per-second="coinsPerSecond"
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
      @mint="handleMint"
      @buy-iron="buyIron"
      @buy-bronze="buyBronze"
      @buy-silver="buySilver"
      @upgrade-hammer="upgradeHammer"
    />
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import MintArea from '../components/MintArea.vue'

const coins = ref(0)

const ironCount = ref(0)
const bronzeCount = ref(0)
const silverCount = ref(0)
const hammerLevel = ref(0)

const ironCost = 20
const bronzeCost = 35
const silverCost = 60
const hammerCost = 40

const baseIntervalMs = 1000
let autoTimerId = null

const clickPower = computed(function () {
  return 1 + hammerLevel.value
})

const speedMultiplier = computed(function () {
  return 1 + ironCount.value * 0.10 + bronzeCount.value * 0.15 + silverCount.value * 0.25
})

const speedPercent = computed(function () {
  return Math.round(speedMultiplier.value * 100)
})

const currentIntervalMs = computed(function () {
  return baseIntervalMs / speedMultiplier.value
})

const coinsPerSecond = computed(function () {
  return 1000 / currentIntervalMs.value
})

function addAutoCoin() {
  coins.value += 1
}

function scheduleNextTick() {
  if (autoTimerId) {
    clearTimeout(autoTimerId)
  }

  autoTimerId = setTimeout(function () {
    addAutoCoin()
    scheduleNextTick()
  }, currentIntervalMs.value)
}

function handleMint() {
  coins.value += clickPower.value
}

function buyIron() {
  if (coins.value < ironCost) {
    return
  }

  coins.value -= ironCost
  ironCount.value += 1
}

function buyBronze() {
  if (coins.value < bronzeCost) {
    return
  }

  coins.value -= bronzeCost
  bronzeCount.value += 1
}

function buySilver() {
  if (coins.value < silverCost) {
    return
  }

  coins.value -= silverCost
  silverCount.value += 1
}

function upgradeHammer() {
  if (coins.value < hammerCost) {
    return
  }

  coins.value -= hammerCost
  hammerLevel.value += 1
}

watch(currentIntervalMs, function () {
  scheduleNextTick()
})

onMounted(function () {
  scheduleNextTick()
})

onBeforeUnmount(function () {
  if (autoTimerId) {
    clearTimeout(autoTimerId)
  }
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  /* min-height: 100dvh; */

    background-image: url("/ima5555withoutge.png");
    background-size: 100%;
    background-repeat: no-repeat;
    margin-top: 50px;
}
</style>
