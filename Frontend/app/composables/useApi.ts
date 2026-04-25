import { useRequestQueue } from "./useRequestQueue"
export const useApi = () => {
    const config = useRuntimeConfig()

    const { add } = useRequestQueue(3)

    // -------------------------
    // TOKENS
    // -------------------------
    const getAccessToken = () => {
        if (!process.client) return null
        return localStorage.getItem('access_token')
    }

    const getRefreshToken = () => {
        if (!process.client) return null
        return localStorage.getItem('refresh_token')
    }

    const setAccessToken = (token: string) => {
        localStorage.setItem('access_token', token)
    }

    const clearAuth = async () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        await navigateTo('/login')
    }

    // -------------------------
    // REFRESH CONTROL
    // -------------------------
    let refreshPromise: Promise<string | null> | null = null

    const refreshToken = async (): Promise<string | null> => {
        if (refreshPromise) return refreshPromise

        refreshPromise = (async () => {
        const refresh = getRefreshToken()
        if (!refresh) {
            await clearAuth()
            return null
        }

        try {
            const res: any = await $fetch(
            `${config.public.apiBase}/api/v1/auth/refresh`,
            {
                method: 'POST',
                body: { refresh_token: refresh }
            }
            )

            if (!res?.access_token) {
            await clearAuth()
            return null
            }

            setAccessToken(res.access_token)
            return res.access_token

        } catch (err) {
            await clearAuth()
            return null
        } finally {
            refreshPromise = null
        }
        })()

        return refreshPromise
    }

    // -------------------------
    // CORE REQUEST (QUEUE + REFRESH + RETRY)
    // -------------------------
    const request = (url: string, options: any = {}, _retry = false) => {
        return new Promise((resolve, reject) => {
        add(async () => {
            try {
            const res = await $fetch(`${config.public.apiBase}${url}`, {
                ...options,
                headers: {
                Authorization: getAccessToken()
                    ? `Bearer ${getAccessToken()}`
                    : '',
                ...(options.headers || {})
                }
            })

            resolve(res)

            } catch (error: any) {
            const status = error?.response?.status

            // -------------------------
            // AUTO REFRESH FLOW
            // -------------------------
            if (status === 401 && !_retry) {
                const newToken = await refreshToken()

                if (!newToken) return reject(error)

                // retry original request
                try {
                const retryRes = await $fetch(`${config.public.apiBase}${url}`, {
                    ...options,
                    headers: {
                    Authorization: `Bearer ${newToken}`,
                    ...(options.headers || {})
                    }
                })

                return resolve(retryRes)

                } catch (err) {
                return reject(err)
                }
            }

            reject(error)
            }
        })
        })
    }

    // -------------------------
    // HELPERS (optional clean API)
    // -------------------------
    const api = {
        get: (url: string) => request(url),
        post: (url: string, body: any) =>
        request(url, { method: 'POST', body }),

        put: (url: string, body: any) =>
        request(url, { method: 'PUT', body }),

        delete: (url: string) =>
        request(url, { method: 'DELETE' })
    }

    return {
        request,
        api,
        refreshToken,
        clearAuth
    }
}