import * as d3 from 'd3'
import {dataSource} from './datasource2.js'
import {AdaptData,AdaptSize} from './adaptData.js'
import {axisConfig} from './axisconfig.js'
//插入数据结构
//适配体温单需要的数据
let adaptData=new AdaptData(dataSource)
let adaptSize=new AdaptSize(dataSource)

export  class Layout{
  constructor(ConstructorTest){
    this.titleData=adaptData.getDynamicHeader()
    this.wrap=null
    this.titleWrap=null
    this.row=null
    this.colums=null
    // DrawIconTest() //图标测试
    ConstructorTest()//利用坐标轴布局测试
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
  createRow(){//svg
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
