export const useCharacterStore = defineStore("characterStore", {
    persist: { storage: persistedState.localStorage },
    state: (): any => ({
        list: [{ skinId: "2000", scale: 1, flipX: false, items: [] }],

        currentEditCharacterIndex: 0,

        skinIdList: []
    }),

    getters: {
        currentCharacter(store) {
            return store.list[store.currentEditCharacterIndex]
        }
    },
    actions: {
        // getCharacterImgUrl(): string {
        //     return `${wzStore.region}/${wzStore.version}`
        // }
    }
})
