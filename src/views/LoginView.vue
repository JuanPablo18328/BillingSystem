<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'

const auth = useAuthStore()
const router = useRouter()

const mode = ref('login')

const title = computed(() =>
  mode.value === 'login' ? 'Welcome to billing system' : 'Create your account',
)

const subtitle = computed(() =>
  mode.value === 'login' ? "Don't have an account yet?" : 'Already have an account?',
)

const toggleCta = computed(() => (mode.value === 'login' ? 'Get Started' : 'Log in'))

const toggleMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login'
}

const handleLogin = async ({ email, password }) => {
  try {
    await auth.signIn(email, password)
    router.replace({ name: 'home' })
  } catch {}
}

const handleRegister = async ({ email, password }) => {
  try {
    await auth.signUp(email, password)

    // Recomendación: volver a login después de registrar
    // Si en Supabase tienes confirmación por correo, aquí mostrarías un mensaje.
    mode.value = 'login'
  } catch {}
}
</script>

<template>
  <section class="w-2xl max-w-4xl rounded-xl bg-white shadow-md p-5 grid grid-cols-2">
    <img
      class="w-68 rounded-lg col-span-1"
      src="@/assets/imgLogin.webp"
      alt="Imagen representativa tecnológica"
    />

    <div class="flex flex-col items-center justify-center gap-5 col-span-1 w-full">
      <!-- Header -->
      <div class="flex items-center justify-center flex-col text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6a5ef6"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-vector-square"
          aria-hidden="true"
        >
          <path d="M19.5 7a24 24 0 0 1 0 10" />
          <path d="M4.5 7a24 24 0 0 0 0 10" />
          <path d="M7 19.5a24 24 0 0 0 10 0" />
          <path d="M7 4.5a24 24 0 0 1 10 0" />
          <rect x="17" y="17" width="5" height="5" rx="1" />
          <rect x="17" y="2" width="5" height="5" rx="1" />
          <rect x="2" y="17" width="5" height="5" rx="1" />
          <rect x="2" y="2" width="5" height="5" rx="1" />
        </svg>

        <h1 class="font-semibold text-2xl">{{ title }}</h1>

        <p class="font-normal text-xs">
          {{ subtitle }}
          <button
            type="button"
            @click="toggleMode"
            :disabled="auth.loading"
            class="text-indigo-600 font-semibold cursor-pointer hover:underline disabled:opacity-60"
          >
            {{ toggleCta }}
          </button>
        </p>
      </div>

      <!-- Body: switch forms -->
      <LoginForm
        v-if="mode === 'login'"
        :loading="auth.loading"
        :error="auth.error"
        @submit="handleLogin"
      />

      <RegisterForm v-else :loading="auth.loading" :error="auth.error" @submit="handleRegister" />
    </div>
  </section>
</template>

<style scoped></style>
