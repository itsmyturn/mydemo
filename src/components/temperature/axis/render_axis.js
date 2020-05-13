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
  }
  addAxisX(){//在svg中生成坐标轴
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
  }
  addAxisY(){
    this.addBreathAxisY()
    this.addPulseAxisY()
    this.addTemperatureAxisY()
  }
  addPulseAxisY(){
    let axis=new Axis()
    axis.setAxisConfig({
      tickSizeY:0,
      tickFormatCallback:function (d){
        if (d % 20 === 0) {
          return d
        }
      },
      tickValueRange:[12,180,4],
      domainRange:[12, 180],
      valueRange:[500, 0]

    })
    let tickNumberParent=d3.select('.title_temperatureAndPulse')
      .append('div')
      .style('width','55px')
      .style('height','100%')
      .style('position','absolute')
      .style('left','10px')
      .style('top',0)
      .append('svg')
      .attr('width','100%')
      .attr('height','100%')
    tickNumberParent
      .append('g')
      .classed('tickPulseNumber',true)
      .attr('transform',`translate(54,0)`)
      .call(axis.getAxisY())
    tickNumberParent.select('.tickPulseNumber').selectAll('.tick')
    .select('line')
    .attr('stroke','none')
    tickNumberParent.select('.tickPulseNumber').selectAll('.tick')
      .select('text')
      .attr('x', '-20')
  }
  addTemperatureAxisY(){
    let axis=new Axis()
    let parent=d3.select('.axis_layout_temperatureAndPulse')
    axis.setAxisConfig({
      tickFormatCallback:function (d){
        if (Math.floor(d) === d) {
            return d
        }
      },
      tickValueRange:[33.6,42,0.2],
      domainRange:[33.6, 42],
      valueRange:[500, 0]
    })
    parent
      .append('g')
      .attr('class', 'temperatureY axisY')
      .attr('transform',`translate(0,0)`)
      .call(axis.getAxisY())
    d3.select('.temperatureY')
      .selectAll('g.tick')
      .select('line')
      .attr('class','yAxisLine')
      .attr('stroke',function(d){
        if(Math.floor(d)===d){
          return '#000'
        }else{
          return '#ccc'
        }
      })
      .attr('stroke-width',function(d){
        if(Math.floor(d)===d){
          return 2
        }else{
          return 1
        }
      })
    let tickNumberParent=d3.select('.title_temperatureAndPulse')
      .append('div')
      .style('width','55px')
      .style('height','100%')
      .style('position','absolute')
      .style('right','5px')
      .style('top',0)
      .append('svg')
      .attr('width','100%')
      .attr('height','100%')
    tickNumberParent
      .append('g')
      .classed('tickTemperatureNumber',true)
      .attr('transform',`translate(30,0)`)
      .call(axis.getAxisY())
    tickNumberParent.select('.tickTemperatureNumber').selectAll('.tick')
    .select('line')
    .attr('stroke','none')
    tickNumberParent.select('.tickTemperatureNumber').select('path')
    .attr('stroke','none')
  }
  addBreathAxisY(){
    let axis=new Axis()
    let parent=d3.select('.axis_layout_pain')
    axis.setAxisConfig({
      tickValueRange:[0, 110 / 10, 2],
      domainRange:[-1, 11],
      valueRange:[100, -1]
    })
    parent
      .append('g')
      .attr('class', 'painY axis')
      .attr('transform',`translate(0,0)`)
      .call(axis.getAxisY())
    let tickNumberParent=d3.select('.title_pain')
      .append('div')
      .style('width','30px')
      .style('height','100%')
      .style('position','absolute')
      .style('right',0)
      .style('top',0)
      .append('svg')
      .attr('width','100%')
      .attr('height','100%')
    tickNumberParent
      .append('g')
      .classed('tickNumber',true)
      .attr('transform',`translate(30,0)`)
      .call(axis.getAxisY())
  }
}