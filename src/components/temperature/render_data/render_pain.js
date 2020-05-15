import * as d3 from 'd3'
import {Axis} from '../draw_axis/axis.js'
import {axisConfig} from '../draw_axis/axisconfig.js'
export class Pain{
  constructor(){
    this.data=[]
    this.painLine=null
    axisConfig.forEach(item=>{
      if(item.nameEn==='pain'){
        this.data=item.data
      }
    })
    this.axis=new Axis()
    this.axis.setAxisConfig({
      tickValueRange:[0, 110 / 10, 2],
      domainRange:[-1, 11],
      valueRange:[100, -1]
    })
  }
  renderData(){
    this.renderLine()
  }
  renderLine(){
    this.painLine = d3
      .line()
      .defined(function (d) {
        console.log('d',d)
        return d.pain != null
      })
      .x((d)=> {
        return this.axis.getScaleX()(new Date(d.datetime))
      })
      .y( (d)=> {
        console.log('y',this.axis.getScaleY()(d.pain))
        return this.axis.getScaleY()(d.pain)//
      })
    d3.select('.axis_layout_pain')
      .append('path')
      .data(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1)
      .attr('class', 'painLine')
      .attr('d', this.painLine(this.data))
  }
}