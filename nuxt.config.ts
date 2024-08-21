// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    ssr: false,
    devtools: { enabled: true },
    app: { baseURL: "/MapleStory_Simulator" },
    modules: ["@nuxtjs/tailwindcss", "@element-plus/nuxt", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
    elementPlus: {
        /** Options */
    }
})
