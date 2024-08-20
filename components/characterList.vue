<script setup lang="ts">
const character = useCharacterStore()
const wz = useWzStore()

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

const characterItemUrl = (item: any) => {
    const current = item

    let skinItemJson = JSON.stringify({ ItemId: current.skinId, Version: wz.version, Region: wz.region })
    let bodySkinJson = JSON.stringify({ ItemId: `1${current.skinId}`, Version: wz.version, Region: wz.region })

    let itemsJson = current.items.map(item => ({ ItemId: String(item.id), Version: wz.version, Region: wz.region }))
    itemsJson = JSON.stringify(itemsJson)
    itemsJson = itemsJson.slice(1, -1)
    const characterSetupParams = new URLSearchParams(characterSetup).toString()

    return `https://maplestory.io/api/character/${skinItemJson},${bodySkinJson},${itemsJson}/stand1/0?${characterSetupParams}`
}

const characterPreviewList = computed(() => {
    return character.list.map((item: any) => {
        return characterItemUrl(item)
    })
})
</script>

<template>
    <el-row class="character-list h-full">
        <div
            class="character-list-item w-120 h-full"
            :class="{ active: index === character.currentEditCharacterIndex }"
            v-for="(url, index) in characterPreviewList"
        >
            <el-row class="img-big-outer" justify="center" align="middle">
                <el-image :src="url" @click="character.currentEditCharacterIndex = index" />
            </el-row>
        </div>
    </el-row>
</template>

<style>
.character-list-item {
    overflow: hidden;
    border-right: 1px solid #dcdfe6;
    cursor: pointer;
}
.character-list-item:first-child {
    border-left: 1px solid #dcdfe6;
}
.character-list-item:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.character-list-item.active {
    background-color: rgba(0, 0, 0, 0.1);
}

.img-big-outer {
    height: 300px;
    width: 300px;
    margin-top: calc((120px - 300px) / 2);
    margin-left: calc((120px - 300px) / 2);
}
</style>
