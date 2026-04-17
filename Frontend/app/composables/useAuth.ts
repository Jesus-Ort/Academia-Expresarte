export const useAuth = () => {
    const isLogged = useState<boolean>("isLogged", () => false)

    const checkAuth = () => {
        if (import.meta.client) {
        isLogged.value = !!localStorage.getItem("access_token")
        }
    }

    const logout = async () => {

        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")

        isLogged.value = false

        await navigateTo("/")
    }

    return {
        isLogged,
        checkAuth,
        logout
    }
}