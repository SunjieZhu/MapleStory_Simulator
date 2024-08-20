<script setup lang="ts">
import { ArrowLeft, ArrowRight, Delete, Edit, Share, Plus, Minus } from "@element-plus/icons-vue"

const character = useCharacterStore()
const wz = useWzStore()

// const characterItemUrl = computed(() => {
//     if (!character.list.length) return
//     if (character.list.length < character.currentEditCharacterIndex) return
//     const current = character.list.find((item, index) => {
//         return character.currentEditCharacterIndex === index
//     })

//     return `https://maplestory.io/api/${wz.region}/${wz.version}/Character/center/${current.skinId}/${current.items.map(item => item.id).join(",")}`
// })

const characterSetup = {
    showEars: "False",
    showLefEars: "False",
    showHighLefEars: "False",
    padding: "2",
    name: "",
    flipX: "False",
    renderMode: "Centered",
    resize: "1"
}

const characterItemUrl = computed(() => {
    if (!character.list.length) return
    if (character.list.length < character.currentEditCharacterIndex) return
    const current = character.list.find((item, index) => {
        return character.currentEditCharacterIndex === index
    })

    let skinItemJson = JSON.stringify({ ItemId: current.skinId, Version: wz.version, Region: wz.region })
    let bodySkinJson = JSON.stringify({ ItemId: `1${current.skinId}`, Version: wz.version, Region: wz.region })

    let itemsJson = current.items.map(item => ({ ItemId: String(item.id), Version: wz.version, Region: wz.region }))
    itemsJson = JSON.stringify(itemsJson)
    itemsJson = itemsJson.slice(1, -1)
    const characterSetupParams = new URLSearchParams(characterSetup).toString()

    return `https://maplestory.io/api/character/${skinItemJson},${bodySkinJson},${itemsJson}/stand1/0?${characterSetupParams}`
})

// onMounted(() => {
//     if (character.list.length === 0) character.list.push()
// })
</script>

<template>
    <el-row class="character-item" justify="center" align="middle">
        <el-image
            :style="{ scale: character.list[character.currentEditCharacterIndex].scale }"
            :class="{ 'mirror-rotate-x': character.currentCharacter.flipX }"
            :src="characterItemUrl"
        />
    </el-row>

    <el-row class="h-32 mt-20" justify="end" align="middle">
        <el-button type="primary" :icon="Plus" @click="character.list.push({ skinId: '2000', scale: 1, flipX: false, items: [] })">ADD</el-button>
    </el-row>
</template>

<style scoped lang="scss">
.character-item {
    height: calc(100% - 32px - 20px);
}

.mirror-rotate-x {
    transform: rotateY(180deg); /* 水平镜像翻转 */
}
</style>
