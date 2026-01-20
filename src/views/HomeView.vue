<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const logout = async () => {
  await auth.signOut()
}
</script>

<template>
  <main style="max-width: 720px; margin: 40px auto">
    <h1>Home</h1>

    <p><strong>User:</strong> {{ auth.user?.email }}</p>

    <button @click="logout" :disabled="auth.loading">
      {{ auth.loading ? 'Saliendo...' : 'Cerrar sesión' }}
    </button>
  </main>
</template>
