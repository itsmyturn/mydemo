import * as d3 from 'd3'
import {AxisTickStyle} from './axis_tick_style.js'//坐标轴tick样式接口
import {axisConfig} from './axisconfig.js'
import {Axis} from './axis.js'
export class RenderAxis{
  constructor(){
    this.axisTickStyle=new AxisTickStyle()
    this.svg=d3.select('.content_auto').append('svg')
    .attr('width','100%')
    .attr('height','100%')
  }
  addAxisX(){//在svg中生成坐标轴
    let axisTickStyle=new AxisTickStyle()
    let h=0
    
    this.svg.selectAll('.axis_layout')
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
      //x轴相关
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
  addAxisY(){

  }
}