import * as d3 from 'd3'
import {axisConfig} from '../draw_axis/axisconfig.js'
import {Axis} from '../draw_axis/axis.js'
import {modHour,formatTime} from '../util.js'
export class Normal7{
  constructor(){
    this.data=axisConfig.filter(item=>{
      return item.show
    })
  }
  renderData(){
    let colums7=['date','zhuYuanTianshu','shouShu','TI_GE_JIAN_CHATI_ZHONG','TI_GE_JIAN_CHASHEN_GAO','YE_TI_RU_LIANG_ml','NIAO_LIANG_ml','DA_BIAN_CI_SHU','PI_SHI_JIE_GUO','XUE_TANG_JIAN_CE_ZHImmolL','TE_SHU_ZHI_LIAO']
    let nodes=d3.selectAll('.axis_layout').nodes()
    this.data.forEach((item,index)=>{
      if(!colums7.includes(item.nameEn))return false
      
      let axis=new Axis()
      d3.select(nodes[index])
        .selectAll('text.textData')
        .data(function(){
          return item.data.filter(item=>item.value)
        })
        .enter()
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
}