<template>
    <div class="test1">
        <el-button @click="$router.push('test1-1')">test1-1</el-button>
        <el-button @click="$router.push('test1-2')">test1-2</el-button>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
