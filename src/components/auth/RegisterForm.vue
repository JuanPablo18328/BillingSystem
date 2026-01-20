<script setup>
import { ref } from 'vue'

const props = defineProps({
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
})

const emit = defineEmits(['submit'])

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const localError = ref('')

const onSubmit = () => {
  localError.value = ''

  if (password.value !== confirmPassword.value) {
    localError.value = 'Passwords do not match'
    return
  }

  emit('submit', { email: email.value, password: password.value })
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-3 w-full">
    <input
      v-model="email"
      type="email"
      autocomplete="email"
      required
      placeholder="Email"
      class="p-3 focus:outline-none focus:ring-2 focus:ring-gray-400/40 focus:border-gray-400 rounded-md"
    />

    <input
      v-model="password"
      type="password"
      autocomplete="new-password"
      required
      minlength="6"
      placeholder="Password"
      class="p-3 focus:outline-none focus:ring-2 focus:ring-gray-400/40 focus:border-gray-400 rounded-md"
    />

    <input
      v-model="confirmPassword"
      type="password"
      autocomplete="new-password"
      required
      minlength="6"
      placeholder="Confirm password"
      class="p-3 focus:outline-none focus:ring-2 focus:ring-gray-400/40 focus:border-gray-400 rounded-md"
    />

    <button
      v-motion
      :initial="{ scale: 1 }"
      :hovered="{ scale: 1.03 }"
      :pressed="{ scale: 0.98 }"
      :transition="{ type: 'spring', stiffness: 300, damping: 20 }"
      class="rounded-full bg-black p-2 text-white font-normal text-md transition-all ease duration-500 cursor-pointer"
      type="submit"
      :disabled="props.loading"
    >
      {{ props.loading ? 'Creating...' : 'Create account' }}
    </button>

    <p v-if="localError" class="text-red-600 text-sm" role="alert">
      {{ localError }}
    </p>

    <p v-if="props.error" class="text-red-600 text-sm" role="alert">
      {{ props.error }}
    </p>
  </form>
</template>
