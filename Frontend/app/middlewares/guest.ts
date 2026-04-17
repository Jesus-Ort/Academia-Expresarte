import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware(() => {
    if (process.client) {
        const token = localStorage.getItem('access_token')
        if (token) return navigateTo('/home')
    }
})