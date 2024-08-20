export const useWzStore = defineStore("wzStore", {
    persist: { storage: persistedState.localStorage },
    state: () => ({
        wzInfo: []
    }),

    getters: {
        region(): string {
            return this.wzInfo[0]
        },
        version(): string {
            return this.wzInfo[1]
        }
    },
    actions: {}
})
