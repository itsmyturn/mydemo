import * as d3 from 'd3'
import {AxisTickStyle} from './axis_tick_style.js'//坐标轴tick样式接口
import {axisConfig} from './axisconfig.js'
import {Axis} from './axis.js'
import {modHour,formatTime} from '../../../pages/util.js'
export class AxisX{
  constructor(){
    
  }
  render(){//在svg中生成坐标轴
    let axisTickStyle=new AxisTickStyle()
    
    let nodes=d3.selectAll('g.axis_layout').nodes()
    nodes.forEach((node,index)=>{
      //x轴相关
      let axis=new Axis()
      let item=axisConfig[index]
      axis.setAxisConfig({
        tickSizeX:item.height,
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
        return axisTickStyle.getStrokeColor(item.nameEn,i)
      })
      .attr('stroke-width', function(d,i){
        return axisTickStyle.getStrokeWidth(item.nameEn,i)
      })
    })
    this.renderDataTest()
  }
  renderDataTest(){
    let colums7=['date','zhuYuanTianshu','shouShu','TI_GE_JIAN_CHATI_ZHONG','TI_GE_JIAN_CHASHEN_GAO','YE_TI_RU_LIANG_ml','NIAO_LIANG_ml','DA_BIAN_CI_SHU','PI_SHI_JIE_GUO','XUE_TANG_JIAN_CE_ZHImmolL','TE_SHU_ZHI_LIAO']
    let nodes=d3.selectAll('.axis_layout').nodes()
    axisConfig.forEach((item,index)=>{
      if(!colums7.includes(item.nameEn))return false
      
      let axis=new Axis()
      d3.select(nodes[index])
        .selectAll('text.textData')
        .data(function(){
          return item.data
        })
        .enter()
        .filter(function(d){
          return d.value
        })
        .append('text')
        .classed('textData',true)
        .attr('x',function(d){
          const time=modHour(d,0)
          return axis.getScaleX()(time)+item.width/2
        })
        .attr('y',function(){
          return item.height/2
        })
        .text(function(d){
          if(item.nameEn==='date'){
            return formatTime(d.value,d.value)
          }else{
            return d.value
          }
          
        })
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline','middle')
        .attr('font-size',12)
    })
  }
  render7ColumsData(){
    
  }
}