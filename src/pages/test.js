import * as d3 from 'd3'
import {axisConfig} from '../components/temperature/axisconfig.js'
import Axis from '../components/temperature/axis.js' //坐标轴接口
import {AxisTickStyle} from '../components/temperature/axis_tick_style.js'//坐标轴tick样式接口

function axisTest(){
  let axisTickStyle=new AxisTickStyle()
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
      return axisTickStyle.getStrokeColor(item.nameEn,i)
    })
    .attr('stroke-width', function(d,i){
      return axisTickStyle.getStrokeWidth(item.nameEn,i)

    })
  })
  
 
}




export{
  axisTest
}