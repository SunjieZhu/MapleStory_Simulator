<script setup lang="ts">
const character = useCharacterStore()

onMounted(() => {})
</script>

<template>
    <!-- <setupInit /> -->

    <el-container>
        <el-header class="simulator-header">
            <el-row :style="{ height: '100%' }" justify="space-between" align="middle">
                <div class="font-bold">MapleStory Simulator</div>
                <el-row align="middle">
                    <wzSelect align="right" />
                </el-row>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="335px" class="simulator-aside">
                <itemList />
            </el-aside>
            <el-main>
                <!-- <img src="https://maplestory.io/api/CMS/202/Character/center/2015/1000017,1050007" />
                <img src="https://maplestory.io/api/CMS/202/Character/center/2015" /> -->
                <characterItem />
                <!-- <el-button type="primary" @click="character.list.push({ skinId: '2000', items: [] })">ADD</el-button> -->
            </el-main>
            <el-aside width="320px" class="simulator-aside-right">
                <characterDetail />
            </el-aside>
            <el-aside width="320px" class="simulator-aside-right">
                <characterItemsDetail />
            </el-aside>
        </el-container>
        <el-footer height="120px" class="simulator-footer">
            <characterList />
        </el-footer>
    </el-container>
</template>

<style scoped lang="scss">
.simulator-header {
    // background-color: #ccc;
    border-bottom: 1px solid #dcdfe6;
}

.simulator-aside {
    border-right: 1px solid #dcdfe6;
}

.simulator-aside-right {
    border-left: 1px solid #dcdfe6;
}

.simulator-footer {
    border-top: 1px solid #dcdfe6;
}
</style>
