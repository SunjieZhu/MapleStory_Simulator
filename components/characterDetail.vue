<script setup lang="ts">
import { Check, Delete, Edit, Message, Search, Star, Close } from "@element-plus/icons-vue"
import _ from "lodash"

const character = useCharacterStore()
const wzStore = useWzStore()

const form = reactive({})

const copyCharacter = () => {
    character.list.push(_.cloneDeep(character.currentCharacter))
}
const deleteCharacter = () => {
    character.list.splice(character.currentEditCharacterIndex, 1)
    if (character.currentEditCharacterIndex !== 0) character.currentEditCharacterIndex--
}
</script>

<template>
    <div class="p-20">
        <el-form>
            <el-form-item label="皮肤">
                <el-select v-model="character.currentCharacter.skinId">
                    <el-option v-for="skin in character.skinIdList" :label="skin.name" :value="skin.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="动画">
                <el-switch v-model="character.currentCharacter.animated" active-value="animated" inactive-value="1" />
            </el-form-item> -->
            <el-form-item label="缩放">
                <el-slider v-model="character.currentCharacter.scale" :max="5" :step="0.1" />
            </el-form-item>

            <el-form-item label="水平翻转">
                <el-switch v-model="character.currentCharacter.flipX" />
            </el-form-item>

            <el-form-item>
                <el-button class="w-full" type="primary" @click="copyCharacter">🥰 COPY</el-button>
            </el-form-item>

            <el-form-item>
                <el-button class="w-full" type="danger" :disabled="character.list.length <= 1" @click="deleteCharacter">💀 DELETE</el-button>
            </el-form-item>
        </el-form>
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
