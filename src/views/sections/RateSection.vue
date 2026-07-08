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
  <section id="rate" class="py-24 bg-slate-50/50 dark:bg-slate-900/50 transition-colors duration-500">
    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-12 flex flex-col items-center justify-center text-center">
        <h2 class="text-sm font-mono text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-2">Feedback</h2>
        <h3 class="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Guestbook</h3>
        <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">Leave a comment below. Your feedback means a lot to me!</p>
      </div>

      <MaintenanceLayer
        v-if="loadError"
        label="Unable to load comments"
        description="Service is temporarily unavailable. Please refresh the page or try again later."
      />

      <!-- Comment Form -->
      <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-6 md:p-8 mb-12">
        <form @submit.prevent="addComment" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col space-y-2">
              <label for="comment-name" class="text-sm font-medium text-slate-700 dark:text-slate-300">
                Name <span class="text-indigo-500 dark:text-indigo-400">*</span>
              </label>
              <input
                id="comment-name"
                v-model="newComment.name"
                type="text"
                placeholder="John Doe"
                class="w-full px-4 py-3 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all duration-200"
              />
            </div>
            <div class="flex flex-col space-y-2">
              <label for="comment-email" class="text-sm font-medium text-slate-700 dark:text-slate-300">
                Email <span class="text-slate-400 dark:text-slate-500 font-normal">(optional)</span>
              </label>
              <input
                id="comment-email"
                v-model="newComment.email"
                type="email"
                placeholder="john@example.com"
                class="w-full px-4 py-3 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all duration-200"
              />
            </div>
          </div>
          <div class="flex flex-col space-y-2">
            <label for="comment-message" class="text-sm font-medium text-slate-700 dark:text-slate-300">
              Message <span class="text-indigo-500 dark:text-indigo-400">*</span>
            </label>
            <textarea
              id="comment-message"
              v-model="newComment.message"
              rows="4"
              placeholder="What's on your mind?"
              class="w-full px-4 py-3 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all duration-200 resize-none"
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full md:w-auto px-8 py-3 bg-slate-900 dark:bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-600 dark:hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              {{ isSubmitting ? 'Posting...' : 'Post Comment' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Comments List -->
      <div v-if="!loadError" class="space-y-6">
        <div class="flex items-center gap-3 mb-6">
          <div class="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
          <span class="text-sm font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {{ comments.length }} Comment{{ comments.length !== 1 ? 's' : '' }}
          </span>
          <div class="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
        </div>

        <div v-if="isLoading" class="flex justify-center py-12">
          <div class="animate-pulse flex space-x-2 items-center text-slate-400 dark:text-slate-500 font-mono text-sm">
            <span class="w-2 h-2 bg-indigo-400 dark:bg-indigo-500 rounded-full"></span>
            <span class="w-2 h-2 bg-indigo-400 dark:bg-indigo-500 rounded-full animation-delay-200"></span>
            <span class="w-2 h-2 bg-indigo-400 dark:bg-indigo-500 rounded-full animation-delay-400"></span>
            <span class="ml-2">Loading...</span>
          </div>
        </div>

        <div v-if="!isLoading && !loadError && comments.length === 0" class="text-center py-12 bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-2xl border-dashed">
          <p class="text-slate-500 dark:text-slate-400 font-medium">No comments yet. Be the first to break the ice!</p>
        </div>

        <div
          v-for="comment in comments"
          :key="comment.id"
          class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 transition-all duration-300 hover:shadow-md group"
        >
          <div class="flex justify-between items-start">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-500/20 dark:to-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-100/50 dark:border-indigo-500/20 shadow-sm">
                <span class="text-indigo-600 dark:text-indigo-400 font-bold text-lg font-mono">
                  {{ comment.name.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 dark:text-white">{{ comment.name }}</h4>
                <p class="text-xs font-mono text-slate-400 dark:text-slate-500 mt-0.5">{{ comment.date }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                <button
                  v-if="canEditComment(comment.userId)"
                  @click="startEditComment(comment)"
                  :disabled="isUpdating || isDeleting"
                  class="p-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors duration-200"
                  aria-label="Edit comment"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  v-if="canDeleteComment(comment.userId)"
                  @click="deleteComment(comment.id)"
                  :disabled="isDeleting || isUpdating"
                  class="p-2 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                  aria-label="Delete comment"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
              <span v-if="!canEditComment(comment.userId)" class="text-slate-300 dark:text-slate-600 text-sm pl-2">
                <i class="fas fa-lock"></i>
              </span>
            </div>
          </div>

          <!-- Edit Mode -->
          <div v-if="editingCommentId === comment.id" class="mt-5">
            <textarea
              v-model="editingMessage"
              rows="3"
              class="w-full px-4 py-3 bg-white dark:bg-slate-900/50 border border-indigo-200 dark:border-indigo-500/30 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all duration-200 resize-none text-slate-900 dark:text-white"
            ></textarea>
            <div class="flex space-x-3 mt-3 justify-end">
              <button
                @click="cancelEditComment"
                class="px-5 py-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                @click="saveEditComment"
                :disabled="isUpdating"
                class="px-5 py-2 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200"
              >
                {{ isUpdating ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </div>
          <p v-else class="mt-5 text-slate-600 dark:text-slate-300 leading-relaxed">{{ comment.message }}</p>
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
