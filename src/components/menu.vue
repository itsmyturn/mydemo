<template>
    <div class="menu-list">
      <el-menu
        router
      >
        <el-menu-item index="/test1">选项1</el-menu-item>
        <el-menu-item index="/test2">旧版体温单</el-menu-item>
        <el-menu-item index="/test3">新版体温单</el-menu-item>
      </el-menu>
    </div>
</template>
<script>
import menuData from '@/data/menu/menu.js' 
export default {
    data(){
        return {
            menuData
        }
    },
    created(){
       
    },
    mounted(){
        //console.log(this.menuData)
    }
}
</script>

