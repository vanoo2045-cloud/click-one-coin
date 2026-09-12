<template>
  <div>
    <NuxtPage />

    <div v-if="offlineReady" class="pwa-toast">
      <p>Приложение готово к работе офлайн</p>
      <button type="button" @click="offlineReady = false">OK</button>
    </div>

    <div v-if="needRefresh" class="pwa-toast">
      <p>Доступна новая версия</p>
      <button type="button" @click="updateServiceWorker(true)">Обновить</button>
      <button type="button" @click="needRefresh = false">Позже</button>
    </div>
  </div>
</template>

<script setup>
import { useRegisterSW } from 'virtual:pwa-register/vue'

useHead({
  link: [
    { rel: 'apple-touch-icon', href: '/icons/icon-192x192.png' }
  ],
  meta: [
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'Click One' }
  ]
})

const { needRefresh, offlineReady, updateServiceWorker } = useRegisterSW({
  onRegistered() {
    console.log('Service Worker зарегистрирован')
  },
  onRegisterError(error) {
    console.error('Ошибка регистрации Service Worker:', error)
  }
})
</script>

<style scoped>
.pwa-toast {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  /* background color: #fff;: rgba(20, 20, 30, 0.92); */
 
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  max-width: calc(100vw - 2rem);
}

.pwa-toast p {
  margin: 0;
  font-size: 0.9rem;
}

.pwa-toast button {
  border: none;
  border-radius: 0.5rem;
  padding: 0.4rem 0.75rem;
  background: #a855f7;
  color: #fff;
  font-size: 0.85rem;
  cursor: pointer;
}

.pwa-toast button:last-child {
  background: rgba(255, 255, 255, 0.15);
}
</style>
