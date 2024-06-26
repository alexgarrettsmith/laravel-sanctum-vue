import axios from 'axios'
import { reactive, computed, ref } from 'vue'

const state = reactive({
    authenticated: false,
    user: {}
})

export default function useAuth() {
    const errors = ref({})

    const getAuthenticated = computed(() => state.authenticated)

    const getUser = computed(() => state.user)

    const setAuthenticated = (authenticated) => {
        state.authenticated = authenticated
    }

    const setUser = (user) => {
        state.user = user
    }

    const attempt = async () => {
        try {
            let response = await axios.get('/api/user')

            setAuthenticated(true)
            setUser(response.data)

            return response
        } catch (e) {
            setAuthenticated(false)
            setUser({})
        }
    }

    const login = async (credentials) => {
        await axios.get('/sanctum/csrf-cookie')

        try {
            await axios.post('/login', credentials)
            return attempt()
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }

            return Promise.reject(null)
        }
    }

    const logout = async () => {
        try {
            await axios.post('/logout')

            setAuthenticated(false)
            setUser({})
        } catch (e) {
            return Promise.reject(null)
        }
    }

    return {
        login,
        attempt,
        getAuthenticated,
        getUser,
        errors,
        logout
    }
}