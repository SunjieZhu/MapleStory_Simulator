<script setup lang="ts">
const wzStore = useWzStore()
const character = useCharacterStore()

const selectedCategory: any = ref([])

const equipCategory: any = ref([])
const equipList: any = ref([])

const keywords = ref("")
const offsetListHeight = computed(() => {
    if (selectedCategory.value.length) {
        return "172px"
    } else {
        return "168px"
    }
})

const sizeList: Number[] = []
for (let index = 1; index < 20; index++) {
    sizeList.push(index * 7)
}

const pagination = reactive({ current: 1, size: 50, sizeList })

// const matchKeywords = (equip: any) => {
//     let includeFlag = false
//     try {
//         keywordsList.forEach(key => {
//             if (equip.name?.includes(key) || String(equip.id)?.includes(key)) {
//                 includeFlag = true
//                 throw "found"
//             }
//         })
//     } catch (error) {}
// }

const selectedList = computed(() => {
    const selectedSubCategory = selectedCategory.value.map((selectedItem: string[]) => selectedItem[1])
    if (selectedSubCategory.length) {
        return equipList.value
            .filter((equip: any) => selectedSubCategory.includes(equip.typeInfo.subCategory))
            .filter((equip: any) => {
                if (!keywords.value) return true
                return equip.name?.includes(keywords.value) || String(equip.id)?.includes(keywords.value)
                // return matchKeywords(equip)
            })
    } else {
        return equipList.value.filter((equip: any) => {
            if (!keywords.value) return true
            return equip.name?.includes(keywords.value) || String(equip.id)?.includes(keywords.value)
            // return matchKeywords(equip)
        })
    }
})

const currentIndex = computed(() => {
    return {
        start: pagination.current * pagination.size - pagination.size,
        end: pagination.current * pagination.size
    }
})

const setupItemList = async () => {
    const itemList: any = await $fetch<string>(`https://maplestory.io/api/${wzStore.region}/${wzStore.version}/item`)
    equipList.value = itemList.filter((item: any) => item.typeInfo?.overallCategory === "Equip")

    character.skinIdList = itemList
        .filter((equip: any) => equip.typeInfo.subCategory === "Head")
        .map((head: any) => ({ ...head, id: String(head.id).slice(1, 5) }))
}

const setupItemCategory = async () => {
    const res: any = await $fetch<string>(`https://maplestory.io/api/${wzStore.region}/${wzStore.version}/item/category`)
    equipCategory.value = Object.keys(res.Equip).map(key => {
        return {
            label: key,
            value: key,
            children: res.Equip[key].map((subCategoryItem: any) => ({
                label: subCategoryItem.item1,
                value: subCategoryItem.item1
            }))
        }
    })
}

const itemSelect = (equip: any) => {
    const sameCategory = character.currentCharacter.items.findIndex((item: any) => {
        return equip.typeInfo.subCategory === item.typeInfo.subCategory
    })

    if (sameCategory !== -1) character.currentCharacter.items.splice(sameCategory, 1)

    character.currentCharacter.items.push(equip)
}

const itemListContainer = ref(null)
const setupPageSize = async () => {
    await nextTick()
    const rows = (itemListContainer.value?.offsetHeight - 4) / (40 + 5)
    console.log(rows)

    pagination.size = Math.floor(rows) * 7
}

onMounted(() => {
    setupItemCategory()
    setupItemList()
    setupPageSize()
})
</script>

<template>
    <div class="p-12">
        <el-cascader
            v-model="selectedCategory"
            :options="equipCategory"
            :props="{ multiple: true }"
            collapse-tags
            collapse-tags-tooltip
            clearable
            placeholder="选择分类"
            class="mb-12 w-full"
        />

        <el-input v-model="keywords" placeholder="输入关键字查询" class="mb-12" clearable></el-input>

        <!-- <el-row> -->
        <!-- {{ selectedList }} -->
        <div class="item-list-container" ref="itemListContainer">
            <el-space wrap :size="[5, 5]">
                <el-row
                    v-for="equip in selectedList.slice(currentIndex.start, currentIndex.end)"
                    class="equip-item w-40 h-40 rounded-4"
                    align="middle"
                    justify="center"
                    @click="itemSelect(equip)"
                >
                    <el-tooltip :content="equip.name" :hide-after="0" :enterable="false">
                        <el-image
                            :key="equip.id"
                            :src="`https://maplestory.io/api/${wzStore.region}/${wzStore.version}/item/${equip.id}/icon`"
                            class="equip-item-img w-42 h-42 leading-16"
                            fit="scale-down"
                        >
                            <template #error>
                                <div class="error-bg w-full h-full">
                                    <span class="text-12">{{ equip.name }}</span>
                                </div>
                            </template>
                        </el-image>
                    </el-tooltip>
                </el-row>
            </el-space>
        </div>
        <!-- <span>{{ equip.name }}</span> -->
        <!-- </el-row> -->

        <el-row justify="center">
            <el-pagination
                v-model:current-page="pagination.current"
                v-model:page-size="pagination.size"
                :pager-count="5"
                layout="prev, pager, next"
                :total="selectedList.length"
            />
        </el-row>

        <el-row justify="center">
            <el-pagination
                v-model:current-page="pagination.current"
                v-model:page-size="pagination.size"
                size="small"
                :page-sizes="pagination.sizeList"
                layout="total, sizes, jumper"
                :total="selectedList.length"
            />
        </el-row>
    </div>
</template>

<style scoped lang="scss">
.item-list-container {
    height: calc(100vh - 60px - 120px - v-bind(offsetListHeight));
    overflow: auto;
}
.equip-item {
    cursor: pointer;
}
.equip-item:hover {
    background-color: #b6b6b6;
}

.error-bg {
    // position: absolute;
    // left: 0;
    // top: 0;
    background-color: rgba($color: #000000, $alpha: 0.1);
}
</style>
