<script setup>
import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()
const auth = useAuthStore()

onMounted(() => {
  if (!auth.initialized) auth.init()
})

watch(
  () => auth.isAuthenticated,
  (isAuthed) => {
    if (!isAuthed && router.currentRoute.value.meta.requiresAuth) {
      router.replace({ name: 'login' })
    }
  },
)
</script>

<template>
  <main class="bg-gray-100 max-w-dvw h-dvh flex items-center justify-center">
    <div
      v-motion
      :initial="{ opacity: 0, y: 16 }"
      :enter="{ opacity: 1, y: 0 }"
      :transition="{ duration: 400, easing: 'ease-out' }"
    >
      <router-view />
    </div>
  </main>
</template>

<style scoped></style>
