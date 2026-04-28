<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { supabase } from '@/lib/supabase'
import MaintenanceLayer from '@/components/base/MaintenanceLayer.vue'

const userStore = useUserStore()

const comments = ref([])
const isLoading = ref(false)
const loadError = ref(false)
const isSubmitting = ref(false)
const isUpdating = ref(false)
const isDeleting = ref(false)

const newComment = ref({
  name: '',
  email: '',
  message: ''
})

const editingCommentId = ref(null)
const editingMessage = ref('')

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function mapComment(row) {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    email: row.email || '',
    message: row.message,
    date: formatDate(row.created_at),
    createdAt: row.created_at
  }
}

async function loadComments() {
  if (!supabase) {
    loadError.value = true
    console.error('Supabase belum dikonfigurasi di file .env.')
    return
  }

  isLoading.value = true
  loadError.value = false

  const { data, error } = await supabase
    .from('comments')
    .select('id, user_id, name, email, message, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    loadError.value = true
    console.error('Error loading comments:', error)
    comments.value = []
  } else {
    comments.value = (data || []).map(mapComment)
  }

  isLoading.value = false
}

async function addComment() {
  if (!newComment.value.name.trim() || !newComment.value.message.trim()) {
    alert('Please fill in all required fields')
    return
  }

  if (!supabase) {
    alert('Supabase belum dikonfigurasi di file .env.')
    return
  }

  isSubmitting.value = true

  const payload = {
    user_id: userStore.userId,
    name: newComment.value.name.trim(),
    email: newComment.value.email.trim() || null,
    message: newComment.value.message.trim()
  }

  const { data, error } = await supabase
    .from('comments')
    .insert(payload)
    .select('id, user_id, name, email, message, created_at')
    .single()

  if (error) {
    alert(`Failed to post comment: ${error.message}`)
    isSubmitting.value = false
    return
  }

  comments.value.unshift(mapComment(data))
  newComment.value.name = ''
  newComment.value.email = ''
  newComment.value.message = ''
  isSubmitting.value = false
}

async function deleteComment(id) {
  const comment = comments.value.find(c => c.id === id)
  if (!comment) return

  if (comment.userId !== userStore.userId) {
    alert('You can only delete your own comments')
    return
  }

  if (!supabase) {
    alert('Supabase belum dikonfigurasi di file .env.')
    return
  }

  isDeleting.value = true

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id)
    .eq('user_id', userStore.userId)

  if (error) {
    alert(`Failed to delete comment: ${error.message}`)
    isDeleting.value = false
    return
  }

  comments.value = comments.value.filter(c => c.id !== id)
  isDeleting.value = false
}

function canDeleteComment(commentUserId) {
  return commentUserId === userStore.userId
}

function startEditComment(comment) {
  const commentData = comments.value.find(c => c.id === comment.id)
  if (!commentData) return

  if (commentData.userId !== userStore.userId) {
    alert('You can only edit your own comments')
    return
  }

  editingCommentId.value = comment.id
  editingMessage.value = comment.message
}

function cancelEditComment() {
  editingCommentId.value = null
  editingMessage.value = ''
}

async function saveEditComment() {
  if (!editingMessage.value.trim()) {
    alert('Message cannot be empty')
    return
  }

  if (!supabase) {
    alert('Supabase belum dikonfigurasi di file .env.')
    return
  }

  isUpdating.value = true

  const { data, error } = await supabase
    .from('comments')
    .update({ message: editingMessage.value.trim() })
    .eq('id', editingCommentId.value)
    .eq('user_id', userStore.userId)
    .select('id, user_id, name, email, message, created_at')
    .single()

  if (error) {
    alert(`Failed to update comment: ${error.message}`)
    isUpdating.value = false
    return
  }

  const index = comments.value.findIndex(c => c.id === editingCommentId.value)
  if (index !== -1) {
    comments.value[index] = mapComment(data)
  }

  isUpdating.value = false
  cancelEditComment()
}

function canEditComment(commentUserId) {
  return commentUserId === userStore.userId
}

onMounted(() => {
  loadComments()
})
</script>

<template>
  <section id="rate" class="py-16 bg-gray-50">
    <h2 class="text-3xl font-extrabold text-gray-900 text-center mb-4">Comments</h2>
    <p class="text-gray-600 text-center mb-10">
      Leave a comment below. Your feedback means a lot to me!
    </p>
    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <MaintenanceLayer
        v-if="loadError"
        label="Unable to load comments"
        description="Service is temporarily unavailable. Please refresh the page or try again later."
      />


      <!-- Comment Form -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-10">
        <form @submit.prevent="addComment" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="input-wrapper flex flex-col space-y-2">
              <label for="comment-name" class="text-lg font-semibold text-gray-800">
                Name <span class="text-red-500">*</span>
              </label>
              <input
                id="comment-name"
                v-model="newComment.name"
                type="text"
                placeholder="Your name"
                class="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 ease-in-out"
              />
            </div>
            <div class="input-wrapper flex flex-col space-y-2">
              <label for="comment-email" class="text-lg font-semibold text-gray-800">
                Email <span class="text-gray-400 text-sm">(optional)</span>
              </label>
              <input
                id="comment-email"
                v-model="newComment.email"
                type="email"
                placeholder="your@email.com"
                class="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 ease-in-out"
              />
            </div>
          </div>
          <div class="input-wrapper flex flex-col space-y-2">
            <label for="comment-message" class="text-lg font-semibold text-gray-800">
              Message <span class="text-red-500">*</span>
            </label>
            <textarea
              id="comment-message"
              v-model="newComment.message"
              rows="4"
              placeholder="Write your comment here..."
              class="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 ease-in-out resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? 'Posting...' : 'Post Comment' }}
          </button>
        </form>
      </div>


      <!-- <div v-if="loadError" class="text-center py-4">
        <MaintenanceSection />
      </div> -->
      <!-- Comments List -->
      <div v-if="!loadError" class="space-y-6">
        <h3 class="text-xl font-semibold text-gray-900">
          {{ comments.length }} Comment{{ comments.length !== 1 ? 's' : '' }}
        </h3>

        <div v-if="isLoading" class="text-center py-8">
          <p class="text-gray-500">Loading comments...</p>
        </div>

        <div v-if="!isLoading && !loadError && comments.length === 0" class="text-center py-8">
          <p class="text-gray-500">No comments yet. Be the first to comment!</p>
        </div>

        <div
          v-for="comment in comments"
          :key="comment.id"
          class="bg-white rounded-xl shadow-md p-6 transition-all duration-200 hover:shadow-lg"
        >
          <div class="flex justify-between items-start">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <span class="text-indigo-600 font-bold text-xl">
                  {{ comment.name.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">{{ comment.name }}</h4>
                <p class="text-sm text-gray-500">{{ comment.date }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button
                v-if="canEditComment(comment.userId)"
                @click="startEditComment(comment)"
                :disabled="isUpdating || isDeleting"
                class="text-gray-400 hover:text-indigo-500 transition-colors duration-200"
                aria-label="Edit comment"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                v-if="canDeleteComment(comment.userId)"
                @click="deleteComment(comment.id)"
                :disabled="isDeleting || isUpdating"
                class="text-gray-400 hover:text-red-500 transition-colors duration-200"
                aria-label="Delete comment"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
              <span v-if="!canEditComment(comment.userId)" class="text-gray-300 text-sm">
                <i class="fas fa-lock"></i>
              </span>
            </div>
          </div>

          <!-- Edit Mode -->
          <div v-if="editingCommentId === comment.id" class="mt-4">
            <textarea
              v-model="editingMessage"
              rows="3"
              class="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-indigo-200 rounded-xl shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 ease-in-out resize-none"
            ></textarea>
            <div class="flex space-x-2 mt-2">
              <button
                @click="saveEditComment"
                :disabled="isUpdating"
                class="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              >
                {{ isUpdating ? 'Saving...' : 'Save' }}
              </button>
              <button
                @click="cancelEditComment"
                class="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
          <p v-else class="mt-4 text-gray-700 leading-relaxed">{{ comment.message }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #c7c7c7;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #a0a0a0;
}
</style>
