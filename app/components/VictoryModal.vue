<template>
  <Transition name="victory">
    <div v-if="visible" class="victory-overlay">
      <div class="victory-card" @click.stop>
        <div class="victory-crown">👑</div>
        <h1 class="victory-title">Победа!</h1>
        <p class="victory-subtitle">20 000 монет собрано</p>
        <p class="victory-text">
          Ополчение готово!<br>
          Ярославль встал за Землю Русскую.<br>
          Путь на Москву открыт!
        </p>
        <button type="button" class="victory-btn" @click="close">
          Ура! ⚔️
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<style scoped>
.victory-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1002;
  padding: 20px;
}

.victory-card {
  background: linear-gradient(160deg, #3d2e10 0%, #1a140c 50%, #2a1a08 100%);
  border: 3px solid #e8c547;
  border-radius: 32px;
  padding: 40px 28px;
  text-align: center;
  max-width: 420px;
  width: 100%;
  box-shadow:
    0 0 60px rgba(232, 197, 71, 0.25),
    0 24px 48px rgba(0, 0, 0, 0.6);
  animation: victoryPulse 2s ease-in-out infinite;
}

.victory-crown {
  font-size: 4rem;
  margin-bottom: 8px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
}

.victory-title {
  font-size: 2.8rem;
  color: #ffe566;
  margin: 0 0 8px;
  text-shadow: 0 2px 8px rgba(255, 200, 0, 0.4);
}

.victory-subtitle {
  font-size: 1.2rem;
  color: #d4a84b;
  margin: 0 0 20px;
  font-weight: bold;
  letter-spacing: 1px;
}

.victory-text {
  font-size: 1.05rem;
  line-height: 1.6;
  color: #e8d5b5;
  margin: 0 0 28px;
}

.victory-btn {
  background: linear-gradient(135deg, #ffe566, #d4a84b);
  border: none;
  color: #2a1a00;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 14px 40px;
  border-radius: 40px;
  cursor: pointer;
  transition: transform 0.1s;
  box-shadow: 0 4px 16px rgba(212, 168, 75, 0.4);
}

.victory-btn:active {
  transform: scale(0.96);
}

@keyframes victoryPulse {
  0%, 100% {
    box-shadow:
      0 0 60px rgba(232, 197, 71, 0.25),
      0 24px 48px rgba(0, 0, 0, 0.6);
  }
  50% {
    box-shadow:
      0 0 80px rgba(232, 197, 71, 0.4),
      0 24px 48px rgba(0, 0, 0, 0.6);
  }
}

.victory-enter-active,
.victory-leave-active {
  transition: opacity 0.4s ease;
}

.victory-enter-from,
.victory-leave-to {
  opacity: 0;
}

.victory-enter-active .victory-card {
  animation: victorySlideIn 0.5s ease-out;
}

@keyframes victorySlideIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(40px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
