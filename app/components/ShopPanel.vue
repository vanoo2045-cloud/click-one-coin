<template>
  <section class="bottom-zone">
    <div class="panel">
      <h2 class="panel-title">Управление</h2>
      <div class="shop-list">
        <button
          class="shop-button"
          :disabled="coins < ironCost"
          @click="$emit('buy-iron')"
        >
          <span class="shop-name">Купить железную монету</span>
          <span class="shop-meta">+10% к скорости · {{ ironCost }} монет</span>
        </button>

        <button
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
        </button>

        <button
          class="shop-button"
          :disabled="coins < hammerCost"
          @click="$emit('upgrade-hammer')"
        >
          <span class="shop-name">Улучшить молот</span>
          <span class="shop-meta">+1 к ручному клику · {{ hammerCost }} монет</span>
        </button>
      </div>

      <div class="stats">
        <div>Железных монет: {{ ironCount }}</div>
        <div>Бронзовых монет: {{ bronzeCount }}</div>
        <div>Серебряных монет: {{ silverCount }}</div>
        <div>Уровень молота: {{ hammerLevel }}</div>
        <div>Скорость: {{ speedPercent }}%</div>
        <div>Клик: +{{ clickPower }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
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

defineEmits(['buy-iron', 'buy-bronze', 'buy-silver', 'upgrade-hammer'])
</script>

<style scoped>
.bottom-zone {
  background: linear-gradient(180deg, #2d2318, #241c13);
  min-height: 50dvh;
  padding: 16px;
}

.panel {
  backdrop-filter: blur(4px);
  background: rgba(255, 248, 235, 0.08);
  border-radius: 24px 24px 0 0;
  height: 100%;
  padding: 18px;
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
  background: #f2e3c2;
  border: none;
  border-radius: 16px;
  color: #2b2117;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 64px;
  padding: 14px 16px;
  text-align: left;
  transition: transform 0.06s ease, opacity 0.2s ease;
  width: 100%;
}

.shop-button:active {
  transform: scale(0.99);
}

.shop-button:disabled {
  opacity: 0.45;
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
</style>
