<template>
  <Transition name="fade">
    <div v-if="visible" class="greeting-overlay">
      <div class="greeting-card" @click.stop>
        <h1>⚔️ 1612 ⚔️</h1>
        <p>Ярославское стояние</p>
        <p class="greeting-text">
          Кличь народ, чекань монету —<br>
          собирай ополчение!
        </p>
        <button @click="close" class="greeting-btn">Начать</button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['started'])

const visible = ref(false)

// Плавное появление после загрузки
onMounted(() => {
  setTimeout(() => {
    visible.value = true
  }, 200)
})

const close = () => {
  visible.value = false
  emit('started')
}
</script>

<style scoped>
.greeting-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.greeting-card {
  background: linear-gradient(145deg, #2a2418, #1a140c);
  border: 2px solid #c9a87b;
  border-radius: 48px 24px 48px 24px;
  padding: 32px 24px;
  text-align: center;
  max-width: 320px;
  margin: 20px;
  animation: fadeSlideUp 0.6s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.greeting-card h1 {
  font-size: 2.2rem;
  color: #ffdfa0;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.greeting-card p {
  color: #e8d5b5;
  margin: 8px 0;
  line-height: 1.4;
}

.greeting-text {
  font-size: 0.95rem;
  margin: 16px 0 !important;
  color: #c9a87b !important;
}

.greeting-btn {
  background: linear-gradient(135deg, #d4a84b, #b8860b);
  border: none;
  color: #2a1a00;
  font-weight: bold;
  padding: 12px 32px;
  border-radius: 40px;
  font-size: 1.1rem;
  margin-top: 16px;
  cursor: pointer;
  transition: transform 0.1s;
}

.greeting-btn:active {
  transform: scale(0.96);
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>