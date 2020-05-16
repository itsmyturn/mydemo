import * as d3 from 'd3'
import {dataSource} from './datasource2.js'
import {AdaptData} from './adaptData.js'
import {axisConfig} from './draw_axis/axisconfig.js'
//插入数据结构
//适配体温单需要的数据
let adaptData=new AdaptData(dataSource)
export  class Layout{
  constructor(){
    this.titleData=adaptData.getDynamicHeader()
    this.wrap=null
    this.titleWrap=null
    this.row=null
    this.colums=null
    this.createWrap()
    this.createRowDiv()
    // DrawIconTest() //图标测试
    // ConstructorTest()//利用坐标轴布局 测试
  }
  createWrap(){
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
      .style('position','relative')
      .text(function(d){
        if(d.nameEn==='temperatureAndPulse'){
          return 
        }else{
          return d.nameCn
        }
        
      })
  }
  createColum(){

  }
}
