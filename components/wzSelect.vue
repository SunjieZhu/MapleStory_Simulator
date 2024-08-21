<script setup lang="ts">
const wzStore = useWzStore()

const wzCascaderOptions: any = ref([])

const setupWzCascaderOptions = async () => {
    const wzInfoList: any = await $fetch<string>("https://maplestory.io/api/wz")
    const cascaderOptions: any[] = []
    wzInfoList.forEach((item: any) => {
        const region = cascaderOptions.find(opt => {
            return opt.value === item.region
        })
        if (region) {
            region.children.unshift({ label: item.mapleVersionId, value: item.mapleVersionId })
        } else {
            cascaderOptions.push({
                label: item.region,
                value: item.region,
                children: [{ label: item.mapleVersionId, value: item.mapleVersionId }]
            })
        }
    })
    wzCascaderOptions.value = cascaderOptions
}

setupWzCascaderOptions()

const wzChange = () => {
    window.location.reload()
}
</script>

<template>
    <el-cascader v-model="wzStore.wzInfo" :options="wzCascaderOptions" @change="wzChange" />
</template>
