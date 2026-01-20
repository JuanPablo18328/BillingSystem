import { defineStore } from 'pinia'
import { supabase } from '@/libs/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    session: null,
    user: null,
    loading: false,
    error: null,
    initialized: false,
  }),

  getters: {
    isAuthenticated: (s) => !!s.session,
  },

  actions: {
    async init() {
      // 1) sesión actual
      const { data, error } = await supabase.auth.getSession()
      if (error) this.error = error.message
      this.session = data?.session ?? null
      this.user = data?.session?.user ?? null

      // 2) escuchar cambios (login/logout/refresh)
      supabase.auth.onAuthStateChange((_event, session) => {
        this.session = session
        this.user = session?.user ?? null
      })

      this.initialized = true
    },

    async signIn(email, password) {
      this.loading = true
      this.error = null
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        this.session = data.session
        this.user = data.user
        return data
      } catch (e) {
        this.error = e?.message ?? 'Error al iniciar sesión'
        throw e
      } finally {
        this.loading = false
      }
    },

    async signUp(email, password) {
      this.loading = true
      this.error = null
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        // Nota: si tienes confirmación por email, aquí no habrá sesión hasta confirmar.
        return data
      } catch (e) {
        this.error = e?.message ?? 'Error al registrarse'
        throw e
      } finally {
        this.loading = false
      }
    },

    async signOut() {
      this.loading = true
      this.error = null
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        this.session = null
        this.user = null
      } catch (e) {
        this.error = e?.message ?? 'Error al cerrar sesión'
        throw e
      } finally {
        this.loading = false
      }
    },
  },
})
