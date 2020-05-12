<template>
    <div class="test3">
        <div class="temperature_wrap">
            <div class="left_title"></div>
            <div class="right_content">
                <div class="content_auto">
                    
                </div>
            </div>
        </div>
        <div class="legend">
            <div class="icon" v-for="item in icons" :key="item">
                <!-- <p>{{item}}</p> -->
            </div>
        </div>
    </div>
</template>
<script>
import {adaptData,Layout} from './test.js'
export default {
    data(){
        return{
           adaptData,
           icons:['腋温','口温','肛温','降温','脉搏','心率','心率起搏器','疼痛','镇痛','腋温脉搏重叠','口温脉搏重叠','肛温脉搏重叠','心率脉搏重叠','疼痛镇痛重叠']
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
.test3{
    width: 1000px;
    margin:0 auto;
    display:flex;
    flex-direction: row;
    text-align: left;
}
.temperature_wrap{
    display:flex;
    flex-direction: row;
    width:700px;
    height:900px;
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
    overflow:hidden;/*auto*/
    border:1px solid #0f0;

}
.content_auto{
    width:800px;
    height:100%;
}
.legend{
    width: 200px;
    height:300px;
    
}
.legend .icon{
    display: flex;
    flex-direction: row;
}
.legend p {
    line-height:20px;
}
</style>
