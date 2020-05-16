import * as d3 from 'd3'
import {Axis} from '../draw_axis/axis.js'
import {axisConfig} from '../draw_axis/axisconfig.js'
import Point from '../point.js'
export class Heart{
  constructor(){
    this.data=[]
    axisConfig.forEach(item=>{
      if(item.nameEn==='temperatureAndPulse'){
        this.data=item.data
      }
    })
    this.parent=d3.select('.axis_layout_temperatureAndPulse')
    this.axis=new Axis()
    this.axis.setAxisConfig({
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

  }
  renderData(){
    this.renderLine()
    this.renderPoint()
  }
  getValue(d){
    return d.xl
  }
  renderLine(){
    this.line = d3
      .line()
      .defined((d)=> {
        return this.getValue(d)
      })
      .x((d)=> {
        return this.axis.getScaleX()(new Date(d.datetime))
      })
      .y((d) =>{
        return this.axis.getScaleY()(this.getValue(d))
      })
    this.parent
      .append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1)
      .attr('class', 'line')
      .attr('d', this.line)
  }
  renderPoint(){
    this.parent
        .append('g')
        .attr('class','pulse_circles_wrap CirclesWrap')
        .selectAll('g')
        .data(()=>{
          return this.data.filter((d)=>{
            const val = this.getValue(d)
            return val
          })
        })
        .enter()
        .append('g')
        .attr('transform', (d)=> {
          let point=new Point()
          var x = this.axis.getScaleX()(new Date(d.datetime))
          var y = this.axis.getScaleY()(this.getValue(d))
          point.draw(this.parent,'heart',{x,y})
          return 'translate(' + x + ',' + y + ')'
        })
  }
}