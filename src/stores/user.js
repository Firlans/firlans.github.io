import { defineStore } from 'pinia'
import { ref } from 'vue'

// Simple UUID generator function
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const useUserStore = defineStore('user', () => {
  const userId = ref(null)

  // Initialize userId from localStorage or generate new one
  function initUserId() {
    const storedUserId = localStorage.getItem('userId')

    if (storedUserId) {
      userId.value = storedUserId
    } else {
      // Generate new UUID
      const newUserId = generateUUID()
      localStorage.setItem('userId', newUserId)
      userId.value = newUserId
    }
  }

  // Get current userId
  function getUserId() {
    return userId.value
  }

  return {
    userId,
    initUserId,
    getUserId
  }
})

