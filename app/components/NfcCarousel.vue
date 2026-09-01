<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center p-4">
    <div class="max-w-2xl w-full">
      
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">🎠 Карусель эмоций</h1>
        <p class="text-white/80 text-lg">Приложи NFC-карточку — следующий смайлик!</p>
      </div>

      <div class="relative bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 overflow-hidden">
        
        <!-- Анимация "Вжух!" -->
        <div 
          v-if="showEntryAnimation"
          class="absolute inset-0 flex items-center justify-center z-10 bg-white/30 backdrop-blur-sm rounded-3xl"
          :class="{ 'animate-fade-out': animationEnding }"
        >
          <div class="text-8xl animate-bounce">
            ✨🎉✨
          </div>
        </div>
        
        <!-- Основной смайлик -->
        <div 
          class="text-center transition-all duration-500 transform"
          :class="{
            'scale-110 rotate-12': isAnimating,
            'scale-100 rotate-0': !isAnimating
          }"
        >
          <div class="text-[200px] md:text-[300px] mb-4 filter drop-shadow-2xl">
            {{ currentEmoji.emoji }}
          </div>
          <h2 class="text-3xl font-bold text-white mb-2">
            {{ currentEmoji.name }}
          </h2>
          <p class="text-white/70 text-lg">
            {{ currentEmoji.message }}
          </p>
        </div>

        <!-- Индикатор прогресса -->
        <div class="mt-8 flex justify-center gap-2">
          <div 
            v-for="(item, index) in emojis" 
            :key="index"
            class="h-3 rounded-full transition-all duration-300"
            :class="{
              'bg-white w-8': index === currentIndex,
              'bg-white/40 w-3': index !== currentIndex
            }"
          />
        </div>

        <div class="mt-6 text-center">
          <div class="text-white/80 text-sm bg-white/20 rounded-lg p-2 inline-block">
            🎯 Прогресс: {{ currentIndex + 1 }} / {{ emojis.length }}
          </div>
        </div>

        <div class="mt-4 text-center">
          <button
            @click="resetProgress"
            class="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm transition-all"
          >
            🔄 Сбросить прогресс (начать с щенка)
          </button>
        </div>
      </div>

      <div class="mt-6 text-center text-white/60 text-sm bg-white/10 rounded-lg p-3">
        <p>📱 <strong>Как играть:</strong> Каждый раз прикладывая NFC-карточку (или обновляя страницу с ?puzzle=1),</p>
        <p>ты будешь получать <strong>НОВОГО</strong> следующего зверька по очереди!</p>
        <p class="text-yellow-200 mt-1">✨ Сейчас ты на зверьке #{{ currentIndex + 1 }} из {{ emojis.length }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const emojis = [
  { emoji: '🐶', name: 'Щенок', message: 'Гав-гав! Весёлый пёсик' },
  { emoji: '🐱', name: 'Котёнок', message: 'Мяу! Пушистый друг' },
  { emoji: '🐭', name: 'Мышка', message: 'Пи-пи! Маленькая кроха' },
  { emoji: '🐹', name: 'Хомяк', message: 'Хрум-хрум! Толстячок' },
  { emoji: '🐰', name: 'Зайчик', message: 'Прыг-скок! Длинные уши' },
  { emoji: '🦊', name: 'Лисичка', message: 'Хитрая красавица' },
  { emoji: '🐻', name: 'Мишка', message: 'У-у-у! Косолапый' },
  { emoji: '🐼', name: 'Панда', message: 'Люблю бамбук!' },
  { emoji: '🐨', name: 'Коала', message: 'Соня-засоня' },
  { emoji: '🦁', name: 'Львёнок', message: 'Р-р-р! Маленький король' }
]

const currentIndex = ref(0)
const isAnimating = ref(false)
const showEntryAnimation = ref(false)
const animationEnding = ref(false)

const currentEmoji = computed(() => emojis[currentIndex.value])

// Функция переключения на следующий смайлик
const nextEmoji = () => {
  // Переключаем на следующий индекс
  const newIndex = (currentIndex.value + 1) % emojis.length
  currentIndex.value = newIndex
  
  // Сохраняем в localStorage
  localStorage.setItem('carousel_index', currentIndex.value)
  
  console.log('🎉 Переключили! Теперь индекс:', currentIndex.value, 'Смайлик:', currentEmoji.value.name)
  
  // Анимация
  isAnimating.value = true
  setTimeout(() => {
    isAnimating.value = false
  }, 500)
}

// Сброс прогресса
const resetProgress = () => {
  currentIndex.value = 0
  localStorage.setItem('carousel_index', 0)
  console.log('🔄 Прогресс сброшен! Начинаем с щенка')
  
  // Показываем анимацию сброса
  showEntryAnimation.value = true
  setTimeout(() => {
    animationEnding.value = true
    setTimeout(() => {
      showEntryAnimation.value = false
      animationEnding.value = false
    }, 500)
  }, 1000)
}

// Главная логика: при загрузке страницы
onMounted(() => {
  // 1. Восстанавливаем последний индекс из localStorage
  const savedIndex = localStorage.getItem('carousel_index')
  if (savedIndex !== null) {
    currentIndex.value = parseInt(savedIndex)
    console.log('💾 Восстановили индекс из памяти:', currentIndex.value)
  } else {
    console.log('🎮 Первый запуск, начинаем с щенка (индекс 0)')
  }
  
  // 2. Проверяем, не пришли ли мы по NFC (с параметром puzzle)
  const params = new URLSearchParams(window.location.search)
  const puzzleParam = params.get('puzzle')
  
  if (puzzleParam !== null) {
    console.log('🎉 Сработала NFC метка! Переключаем на следующего зверька...')
    
    // Показываем анимацию
    showEntryAnimation.value = true
    
    // Переключаем на следующего зверька
    nextEmoji()
    
    // Закрываем анимацию
    setTimeout(() => {
      animationEnding.value = true
      setTimeout(() => {
        showEntryAnimation.value = false
        animationEnding.value = false
      }, 500)
    }, 1500)
    
    // Очищаем URL
    const cleanUrl = window.location.protocol + '//' + window.location.host + window.location.pathname
    window.history.replaceState({}, '', cleanUrl)
  } else {
    console.log('💡 Обычный запуск, показываем текущего зверька:', currentEmoji.value.name)
  }
})
</script>

<style scoped>
@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; visibility: hidden; }
}

.animate-fade-out {
  animation: fade-out 0.5s forwards;
}
</style>