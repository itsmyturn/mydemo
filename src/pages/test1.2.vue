<template>
    <div class="test1-2" ref="outer_wrap" tabindex = "0">
        <div class="wrap" ref="inner_wrap" tabindex = "1">
            <div v-for="item in 10" :key="item">
                <p>文本1{{item}}</p>
            </div>
        </div>
        
    </div>
</template>
<script>
export default{
    mounted(){
        this.handlerScroll()
    },
    methods:{
        handlerScroll(){
            //容器高度+容器top值<=可视区高度
            let innerWrap=this.$refs.inner_wrap
            let clientHeight=window.innerHeight|| document.documentElement.clientHeight
            let top=innerWrap.getBoundingClientRect().top
            let height=innerWrap.offsetHeight
            console.log(top,height,clientHeight)
            if((top+height)<clientHeight)return false
            innerWrap.onscroll=function(){
                let inScrollTop=innerWrap.scrollTop
                let inScrollHeight=innerWrap.scrollHeight
                let ratio=inScrollTop/inScrollHeight
                let bodyScrollHeight=window.document.body.scrollHeight
                let top=bodyScrollHeight*ratio*0.5
                scrollTo(0,top)
                
                
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .test1-2{
        height: 1000px;
    }
    .wrap{
        width:300px;
        height:600px;
        border:1px solid #000;
        overflow: scroll;
    }
</style>

