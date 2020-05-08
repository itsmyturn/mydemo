<template>
    <div class="test3">
        <div class="temperature_wrap">
            <div class="left_title"></div>
            <div class="right_content">
                <div class="content_auto">
                    右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域右侧内容区域
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {adaptData,Layout} from './test.js'
export default {
    data(){
        return{
           adaptData 
        }
    },
    mounted(){
        this.$nextTick(()=>{
            let layout=new Layout()
            layout.createWrap()
            layout.createRow()
        })
    }
}
</script>
<style scoped>

.temperature_wrap{
    display:flex;
    flex-direction: row;
    width:700px;
    height:900px;
    margin:0 auto;
    border:1px solid #000;
    overflow:hidden;
}
.left_title{
    width: 130px;
    height:100%;
    border:1px solid #000;
}
.right_content{
    flex:1;
    overflow:auto;
    border:1px solid #0f0;

}
.content_auto{
    width:800px;
}
</style>
