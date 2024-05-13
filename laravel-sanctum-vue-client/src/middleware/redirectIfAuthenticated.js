import useAuth from "../composables/useAuth.js";

const { getAuthenticated: authenticated } = useAuth()

export default function redirectIfAuthenticated({ next }) {
    if (authenticated.value) {
        return next({
            name: 'dashboard'
        })
    }

    return next()
}