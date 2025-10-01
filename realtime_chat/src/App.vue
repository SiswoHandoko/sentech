<template>
  <div id="app">
    <button 
      class="dual-window-button" 
      @click="openSecondWindow"
      v-if="!isSecondWindow"
    >
      Open Second Window
    </button>
    
    <div class="chat-container">
      <div class="chat-window">
        <div class="chat-header">
          <h2>{{ windowTitle }}</h2>
          <div class="user-info">
            <div class="avatar">{{ currentUser.avatar }}</div>
            <span>{{ currentUser.name }}</span>
            <span v-if="isConnected">🟢</span>
            <span v-else>🔴</span>
          </div>
        </div>
        
        <div class="messages-container" ref="messagesContainer">
          <div 
            v-for="message in messages" 
            :key="message.id"
            :class="['message', { own: message.user.id === currentUser.id }]"
          >
            <div class="avatar">{{ message.user.avatar }}</div>
            <div class="message-content">
              <div>{{ message.text }}</div>
              <div class="message-meta">
                {{ message.user.name }} • {{ formatTime(message.timestamp) }}
              </div>
            </div>
          </div>
          
          <div 
            v-if="typingUsers.length > 0" 
            class="typing-indicator"
          >
            <span>{{ typingUsers.join(', ') }} is typing</span>
            <div class="typing-dots">
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
            </div>
          </div>
        </div>
        
        <div class="input-container">
          <div class="input-wrapper">
            <input 
              v-model="newMessage"
              @keyup.enter="sendMessage"
              @input="handleTyping"
              class="message-input"
              placeholder="Type a message..."
              :disabled="!isConnected"
            />
            <button 
              @click="sendMessage"
              class="send-button"
              :disabled="!newMessage.trim() || !isConnected"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { io, Socket } from 'socket.io-client'

// Types
interface User {
  id: string
  name: string
  avatar: string
}

interface Message {
  id: string | number
  text: string
  user: User
  timestamp: string
  type?: string
}

// Reactive data
const socket = ref<Socket | null>(null)
const isConnected = ref(false)
const messages = ref<Message[]>([])
const newMessage = ref('')
const currentUser = ref<User>({
  id: '',
  name: '',
  avatar: '👤'
})
const typingUsers = ref<string[]>([])
const isSecondWindow = ref(false)
const windowTitle = ref('# General')

// Refs
const messagesContainer = ref<HTMLElement>()

// Initialize socket connection
const initSocket = () => {
  socket.value = io('http://localhost:3001', {
    transports: ['websocket']
  })

  socket.value.on('connect', () => {
    isConnected.value = true
    console.log('Connected to server')
    
    // Join with user data
    socket.value?.emit('join', {
      name: currentUser.value.name,
      avatar: currentUser.value.avatar
    })
  })

  socket.value.on('disconnect', () => {
    isConnected.value = false
    console.log('Disconnected from server')
  })

  socket.value.on('newMessage', (message: Message) => {
    messages.value.push(message)
    scrollToBottom()
  })

  socket.value.on('userJoined', (user: User) => {
    console.log('User joined:', user.name)
  })

  socket.value.on('userLeft', (user: User) => {
    console.log('User left:', user.name)
  })

  socket.value.on('userTyping', (data: { userId: string, userName: string, isTyping: boolean }) => {
    if (data.userId !== currentUser.value.id) {
      if (data.isTyping) {
        if (!typingUsers.value.includes(data.userName)) {
          typingUsers.value.push(data.userName)
        }
      } else {
        typingUsers.value = typingUsers.value.filter(name => name !== data.userName)
      }
    }
  })
}

// Generate random user data
const generateUserData = () => {
  const avatars = ['👤', '👨', '👩', '🧑', '👨‍💻', '👩‍💻', '🤖', '🎭']
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry']
  
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)]
  const randomName = names[Math.floor(Math.random() * names.length)]
  
  return {
    id: '',
    name: `${randomName} ${Math.floor(Math.random() * 1000)}`,
    avatar: randomAvatar
  }
}

// Send message
const sendMessage = () => {
  if (newMessage.value.trim() && socket.value && isConnected.value) {
    socket.value.emit('message', {
      text: newMessage.value.trim(),
      type: 'text'
    })
    newMessage.value = ''
    
    // Stop typing indicator
    socket.value.emit('typing', false)
  }
}

// Handle typing indicator
let typingTimeout: NodeJS.Timeout | null = null
const handleTyping = () => {
  if (socket.value && isConnected.value) {
    socket.value.emit('typing', true)
    
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    
    typingTimeout = setTimeout(() => {
      socket.value?.emit('typing', false)
    }, 1000)
  }
}

// Format timestamp
const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// Scroll to bottom
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// Open second window
const openSecondWindow = () => {
  const secondWindow = window.open(
    window.location.href + '?window=2',
    '# General',
    'width=600,height=800,scrollbars=yes,resizable=yes'
  )
  
  if (secondWindow) {
    secondWindow.focus()
  }
}

// Check if this is second window
const checkWindowType = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const windowParam = urlParams.get('window')
  
  if (windowParam === '2') {
    isSecondWindow.value = true
    windowTitle.value = 'Chat Window 2'
    currentUser.value = generateUserData()
  } else {
    currentUser.value = generateUserData()
  }
}

// Lifecycle hooks
onMounted(() => {
  checkWindowType()
  initSocket()
})

onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect()
  }
  if (typingTimeout) {
    clearTimeout(typingTimeout)
  }
})

// Watch for new messages to trigger animations
watch(messages, () => {
  scrollToBottom()
}, { deep: true })
</script>
