import { computed } from 'vue'

export const useAuth = () => {
    const isLogged = useState<boolean>("isLogged", () => false)
    const userRole = useState<string | null>("userRole", () => null)

    const isAdmin = computed(() => userRole.value === 'admin')

    const checkAuth = () => {
        if (import.meta.client) {
            const token = localStorage.getItem("access_token")
            isLogged.value = !!token
            userRole.value = token ? localStorage.getItem("user_role") : null
        }
    }

    const setUser = (user: { rol?: string } | null) => {
        if (!import.meta.client) return

        const role = user?.rol?.toString().toLowerCase() ?? null
        if (role) {
            localStorage.setItem("user_role", role)
        } else {
            localStorage.removeItem("user_role")
        }

        userRole.value = role
    }

    const logout = async () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("user_role")

        isLogged.value = false
        userRole.value = null

        await navigateTo("/")
    }

    return {
        isLogged,
        userRole,
        isAdmin,
        checkAuth,
        setUser,
        logout
    }
}