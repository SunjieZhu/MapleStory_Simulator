<template>
    <el-row class="index-page-container" justify="center" align="middle">
        <NuxtLink to="/simulator/v1">
            <el-card shadow="never">
                <!-- <img src="/images/simulator-icon.gif" alt="纸娃娃" /> -->
                <el-row class="icon-container" align="middle">
                    <!-- <el-image src="/images/simulator-icon.gif" fit="contain" /> -->
                    <img src="/images/simulator-icon.gif" />
                </el-row>
                <div class="text-14 text-center font-bold mt-10">纸娃娃V1</div>
            </el-card>
        </NuxtLink>

        <!-- <div class="ml-20">
            <el-link href="https://element-plus.org/" type="primary" target="_blank">Element Plus</el-link>
            <br />
            <el-link href="/_tailwind/" type="primary" target="_blank">Tailwind Config Viewer</el-link>
        </div> -->
    </el-row>
</template>

<style scoped lang="scss">
.index-page-container {
    height: 100vh;
}
</style>
