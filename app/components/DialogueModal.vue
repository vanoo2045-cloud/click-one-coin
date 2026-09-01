<template>
  <Transition name="modal">
    <div v-if="visible" class="dialogue-overlay">
      <div class="dialogue-card">
        <div class="dialogue-header">
          <span class="dialogue-title">{{ currentDialogue.title }}</span>
        </div>
        
        <div class="dialogue-speaker">
          <span class="speaker-name">{{ currentDialogue.speaker }}</span>
        </div>
        
        <div class="dialogue-text">
          <p>{{ displayedText }}</p>
          <span v-if="isTyping" class="cursor">|</span>
        </div>
        
        <button 
          v-if="!isTyping" 
          class="dialogue-btn" 
          @click="close"
        >
          Продолжить →
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  triggerAmount: {
    type: Number,
    default: 0
  },
  dialogues: {
    type: Array,
    required: true
  },
  enabled: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['closed', 'opened'])

// Состояния
const visible = ref(false)
const currentDialogue = ref(null)
const displayedText = ref('')
const isTyping = ref(false)
let typingInterval = null
let shownDialogues = new Set() // Запоминаем показанные диалоги

// Находим диалог по триггеру
const findDialogueByAmount = (amount) => {
  // Сортируем по возрастанию триггера
  const sorted = [...props.dialogues].sort((a, b) => a.triggerAmount - b.triggerAmount)
  
  // Находим последний непоказанный диалог, где triggerAmount <= amount
  for (let i = sorted.length - 1; i >= 0; i--) {
    const d = sorted[i]
    if (d.triggerAmount <= amount && !shownDialogues.has(d.id)) {
      return d
    }
  }
  return null
}

// Эффект печати текста
function startTyping(text) {
  isTyping.value = true
  displayedText.value = ''
  let index = 0
  
  if (typingInterval) clearInterval(typingInterval)
  
  typingInterval = setInterval(() => {
    if (index < text.length) {
      displayedText.value += text[index]
      index++
    } else {
      clearInterval(typingInterval)
      typingInterval = null
      isTyping.value = false
    }
  }, 30) // Скорость печати 30ms на символ
}

// Открыть диалог
function openDialogue(dialogue) {
  if (!dialogue || shownDialogues.has(dialogue.id)) return
  
  currentDialogue.value = dialogue
  visible.value = true
  shownDialogues.add(dialogue.id)
  emit('opened')
  startTyping(dialogue.text)
}

// Закрыть диалог
function close() {
  if (typingInterval) {
    clearInterval(typingInterval)
    typingInterval = null
  }
  visible.value = false
  currentDialogue.value = null
  displayedText.value = ''
  emit('closed')
}

// Следим за изменением количества монет
watch(() => props.triggerAmount, (newAmount) => {
  if (!props.enabled || visible.value) {
    return
  }

  const dialogue = findDialogueByAmount(newAmount)
  if (dialogue) {
    openDialogue(dialogue)
  }
}, { immediate: true })

// Очистка при размонтировании
onUnmounted(() => {
  if (typingInterval) {
    clearInterval(typingInterval)
  }
})
</script>

<style scoped>
.dialogue-overlay {
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
  z-index: 1001;
  pointer-events: auto;
}

.dialogue-card {
  pointer-events: auto;
  background: linear-gradient(145deg, #2a2418, #1a140c);
  border: 2px solid #c9a87b;
  border-radius: 24px;
  max-width: 350px;
  width: 85%;
  margin: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.dialogue-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid #c9a87b;
}

.dialogue-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffdfa0;
}

.dialogue-speaker {
  padding: 12px 20px;
  background: rgba(201, 168, 123, 0.15);
  border-bottom: 1px solid #c9a87b33;
}

.speaker-name {
  font-size: 0.9rem;
  font-weight: bold;
  color: #d4a84b;
  letter-spacing: 1px;
}

.dialogue-text {
  padding: 20px;
  min-height: 100px;
  font-size: 1rem;
  line-height: 1.5;
  color: #e8d5b5;
}

.dialogue-text p {
  margin: 0;
  white-space: pre-wrap;
}

.cursor {
  animation: blink 0.8s step-end infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.dialogue-btn {
  display: block;
  width: calc(100% - 40px);
  margin: 0 20px 20px 20px;
  background: linear-gradient(135deg, #4a3724, #2c2418);
  border: 1px solid #c9a87b;
  color: #ffefc0;
  font-weight: bold;
  padding: 12px;
  border-radius: 40px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.1s;
}

.dialogue-btn:active {
  transform: scale(0.96);
}

/* Анимация появления */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .dialogue-card,
.modal-leave-active .dialogue-card {
  transition: transform 0.3s ease;
}

.modal-enter-from .dialogue-card,
.modal-leave-to .dialogue-card {
  transform: scale(0.9);
}
</style>