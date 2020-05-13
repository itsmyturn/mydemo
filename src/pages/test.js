import * as d3 from 'd3'
import {axisConfig} from '../components/temperature/axisconfig.js'
import Axis from '../components/temperature/axis.js' //坐标轴接口


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




export{
  axisTest
}