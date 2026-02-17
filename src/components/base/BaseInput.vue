<script setup>
defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

function handleInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="input-wrapper flex flex-col space-y-2">
    <label
      v-if="label"
      :for="id"
      class="text-lg font-semibold text-gray-800"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      @input="handleInput"
      class="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-200 rounded-xl shadow-sm
             placeholder-gray-400
             focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
             transition-all duration-200 ease-in-out
             disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200"
    />
  </div>
</template>

