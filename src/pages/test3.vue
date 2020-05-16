<template>
    <div class="test3">
        <!-- <button @click="print">打印</button> -->
        <div class="temperature_wrap" id="printContent">
            <div class="left_title_div"></div>
            <!-- <div class="left_title"></div> -->
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
import {axisTest} from './test.js'
import {Layout} from '../components/temperature/layout.js'
export default {
    data(){
        return{
           icons:['腋温','口温','肛温','降温','脉搏','心率','心率起搏器','疼痛','镇痛','腋温脉搏重叠','口温脉搏重叠','肛温脉搏重叠','心率脉搏重叠','疼痛镇痛重叠']
        }
    },
    mounted(){
        this.$nextTick(()=>{
            new Layout(axisTest)
        })
    },
    methods:{
        print(){
            var oldhtml = document.body.innerHTML
            document.body.innerHTML = document.getElementById('printContent').innerHTML
            document.body.setAttribute('class', 'printBody')

            window.print()
            document.body.innerHTML = oldhtml
            window.location.reload()
        }
    }
}
</script>
<style scoped>
.test3{/*需要考虑a4纸的大小*/
    width: 1000px;
    margin:0 auto;
    display:flex;
    flex-direction: row;
    text-align: left;
    height:950px;
    overflow: hidden;
}
.temperature_wrap{
    display:flex;
    flex-direction: row;
    width:700px;
    height:950px;
    /* border:1px solid #000; */
    overflow:hidden;
}
.left_title_div{
    border:1px solid #000;
    border-right:none;
    border-bottom:none;
    text-align: left;
}
.left_title,.left_title_div{
    width: 130px;
    height:900px;
}
.right_content{
    flex:1;
    overflow:auto;/*auto*/
    /* border:1px solid #0f0; */
    

}
.content_auto{
    width:100%;
    height:900px;
    border-bottom:1px solid #000;
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
