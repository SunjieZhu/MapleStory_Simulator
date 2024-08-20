<script setup lang="ts">
import { Check, Delete, Edit, Message, Search, Star, Close } from "@element-plus/icons-vue"

const character = useCharacterStore()
const wzStore = useWzStore()
</script>

<template>
    <div>
        <el-row class="character-detail-list px-16 py-10" v-for="(item, index) in character.currentCharacter?.items" align="middle">
            <el-image
                :key="item.id"
                :src="`https://maplestory.io/api/${wzStore.region}/${wzStore.version}/item/${item.id}/icon`"
                class="equip-item-img w-42 h-42 mr-16"
                fit="scale-down"
                :alt="item.name"
                :title="item.name"
            />
            <div :style="{ flex: 1 }">
                <div class="text-14">{{ item.name }}</div>
                <div class="text-12">
                    <span class="mr-16">{{ item.typeInfo.subCategory }}</span>
                    <span>{{ item.id }}</span>
                </div>
            </div>

            <div>
                <el-button type="danger" :icon="Close" circle @click="character.currentCharacter?.items.splice(index, 1)" />
            </div>
        </el-row>
    </div>
</template>

<style scoped lang="scss">
.character-detail-list {
    border-bottom: 1px solid #dcdfe6;
}

.character-detail-list:last-child {
    border: none;
}

.character-detail-list:hover {
    background-color: rgba($color: #000000, $alpha: 0.1);
}
</style>
