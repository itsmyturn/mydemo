import * as d3 from 'd3'
import {dataSource} from './datasource2.js'
import {AdaptData,AdaptSize} from '../components/temperature/adaptData.js'
import {axisConfig} from '../components/temperature/axisconfig.js'
// import Point from '../components/temperature/point.js' //图标接口 
import Axis from '../components/temperature/axis.js' //坐标轴接口

//适配体温单需要的数据
let adaptData=new AdaptData(dataSource)
let adaptSize=new AdaptSize(dataSource)
function axisTest(){
  
  let h=0
  let svg=d3.select('.content_auto').append('svg')
  .attr('width','100%')
  .attr('height','100%')
  svg.selectAll('.axis_layout')
    .data(axisConfig)
    .enter()
    .append('g')
    .attr('class',function(d){
      return `axis_layout axis_layout_${d.nameEn}`
    })
    .attr('transform',function(d){
      h+=d.top
      return `translate(0,${h})`
    })
  let nodes=d3.selectAll('g.axis_layout').nodes()
  nodes.forEach((node,index)=>{
    let axis=new Axis()
    let item=axisConfig[index]
    axis.setAxisConfig({
      tickSize:item.height-1,
      stepX:item.stepX
    })
    d3.select(nodes[index]).append('g')
    .attr('class','axisX')
    .call(axis.getAxisX())
    d3.select(nodes[index])
    .select(`g.axis_layout_${item.nameEn} g.axisX`)
    .selectAll('g.tick')
    .select('line')
    .attr('class', 'xAxisLine')
    .attr('stroke', function (d,i) {
      let arr=['date','zhuYuanTianshu','shouShu','TI_GE_JIAN_CHATI_ZHONG','TI_GE_JIAN_CHASHEN_GAO','YE_TI_RU_LIANG_ml','NIAO_LIANG_ml','DA_BIAN_CI_SHU','PI_SHI_JIE_GUO','XUE_TANG_JIAN_CE_ZHImmolL','TE_SHU_ZHI_LIAO']
      let arr2=['temperatureAndPulse','pain','hx']
      let arr3=['xueYa']
      if(arr2.includes(item.nameEn)){
        if(i%6===0&&i!==0){
          return 'red'
        }else{
          return '#ccc'
        }
      }
      if(arr.includes(item.nameEn)){
        if(i!==0){
          return 'red'
        }else{
          return '#ccc'
        }
        
      }
      
      if(arr3.includes(item.nameEn)){
        if(i%2===0&&i!==0){
          return 'red'
        }else{
          return '#000'
        }

      }
    })
    .attr('stroke-width', 2)
  })
  
 
}

class Layout{
  constructor(){
    this.titleData=adaptData.getDynamicHeader()
    this.wrap=null
    this.titleWrap=null
    this.row=null
    this.colums=null
    // DrawIconTest() //图标测试
    axisTest()//利用坐标轴布局测试
  }
  createWrap(){
    // this.titleWrap=d3
    //   .select('.left_title')
    //   .append('svg')
    //   .attr('class','left_wrap_svg')
    //   .attr('width','100%')
    //   .attr('height','100%')
    this.titleWrapDiv=d3
      .select('.left_title_div')
  }
  createRowDiv(){
    this.row=this.titleWrapDiv
      .selectAll('div')
      .data(axisConfig)
      .enter()
      .append('div')
      .attr('class',(d)=>{
        return `title_${d.nameEn} title`
      })
      .style('height',function(d){
          return `${d.height}px`
      })
      .style('width','100%')
      .style('border-bottom','1px solid #000')
      .style('box-sizing','border-box')
      .style('line-height',function(d){
        return `${d.height}px`
      })
      .style('font-size','14px')
      .style('padding-left','20px')
      .text(function(d){
        return d.nameCn
      })
  }
  createRow(){
    this.row=this.titleWrap
      .selectAll('g')
      .data(this.titleData)
      .enter()
      .append('g')
      .attr('class',(d)=>{
        return `title_${d.nameEn} title`
      })
      .attr('transform',(d,i)=>{
        if(i<=2){
          return `translate(0,${i*adaptSize.getRowHeight()})`
        }else{
          if(d.nameEn==='hx'){
            return `translate(0,${adaptSize.getBreathTop()})`
          }else{//i-2 ？
            return `translate(0,${(i-2)*adaptSize.getRowHeight()+adaptSize.getBreathTop()})`
          }
        }
      })
    this.titleWrap.append('g') //体温
      .attr('class','title_temperature title')
      .attr('transform',function(){
        return `translate(0,${adaptSize.getTmpTop()})`
      })
    d3.selectAll('.title_temperature')//体温脉搏
      .append('rect')
      .attr('width',()=>{
        return adaptSize.getTitleWidth()
      })
      .attr('height',()=>{
        return adaptSize.getTmpHeight()
      })
      .attr('fill','none')
      .attr('stroke','#000')
    d3.selectAll('.title_temperature')
      .append('text')
      .attr('x',()=>{
        return 0
      })
      .attr('y',()=>{
        return 100
      })
      .text(()=>{
        return '体温单'
      })
    this.titleWrap.append('g') //疼痛
      .attr('class','title_pain title')
      .attr('transform',function(){
        return `translate(0,${adaptSize.getPainTop()})`
      })
      d3.selectAll('.title_pain')
      .append('rect')
      .attr('width',()=>{
        return adaptSize.getTitleWidth()
      })
      .attr('height',()=>{
        return adaptSize.getPainHeight()
      })
      .attr('fill','none')
      .attr('stroke','#000')
    d3.selectAll('.title_pain')
      .append('text')
      .attr('x',()=>{
        return 0
      })
      .attr('y',()=>{
        return 20
      })
      .text(()=>{
        return '疼痛单'
      })
    d3.selectAll('g.title')
      .filter((d)=>{
        return d
      })
      .append('rect')
      .attr('class','title_rect')
      .attr('width',()=>{
        return adaptSize.getTitleWidth()
      })
      .attr('height',(d)=>{
        if(d.nameEn==='hx'){
          return adaptSize.getBreathHeight()
        }else{
          return adaptSize.getRowHeight()
        }
        
      })
      .attr('fill','none')
      .attr('stroke','#000')
    d3.selectAll('g.title')
      .filter((d)=>{
        return d
      })
      .append('text')
      .attr('class','title_text')
      .attr('x',()=>{
        return adaptSize.getTitleWidth()/2
      })
      .attr('y',(d)=>{
        if(d.nameEn==='hx'){
          return adaptSize.getRowHeight() 
        }else{
          return adaptSize.getRowHeight()/2
        }
        
      })
      .text((d)=>{
        return d.nameCn
      })
      .attr('text-anchor','middle')
      .attr('dominant-baseline','middle')
      .attr('font-size',14)
  }
  createColum(){

  }
}


export{
  adaptData,
  adaptSize,
  Layout
}