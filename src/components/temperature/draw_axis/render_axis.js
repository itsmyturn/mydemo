import * as d3 from 'd3'
import {Axis} from './axis.js'
import {axisConfig} from './axisconfig.js'
import {AxisX} from './render_axis_x.js'
import {PulseAxisY} from './render_axis_y_pulse.js'
import {TemperatureAxisY} from './render_axis_y_temperature'
// import {PainAxisY}from './render_axis_y_pain'
export class RenderAxis{
  constructor(){
    this.Axis=Axis
    this.svg=d3.select('.content_auto').append('svg')
    .attr('width','100%')
    .attr('height','100%')
    let h=0
    this.svg.selectAll('.axis_layout')
      .data(()=>{
        return axisConfig.filter(item=>item.show)
      })
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
  render(){
    this.addAxisX()
    this.addAxisY()
  }
  addAxisX(){
    return new AxisX().render()
  }
  addAxisY(){
    new PulseAxisY().render()
    new TemperatureAxisY().render()
    // new PainAxisY().render()
  }
}