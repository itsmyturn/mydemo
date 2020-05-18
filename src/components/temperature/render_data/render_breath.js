import * as d3 from 'd3'
import {modHour} from '../util.js'
import {Axis} from '../draw_axis/axis.js'
import {axisConfig} from '../draw_axis/axisconfig.js'
export class Breath{
  constructor(){
    this.data=[]
    axisConfig.forEach(item=>{
      if(item.nameEn==='hx'){
        this.data=item.data
      }
    })
  }
  renderData () {
    let axis=new Axis()
    d3.select('g.axis_layout_hx')
        .selectAll('text.textData')
        .data(()=>{
          return this.data.filter(d=>d.value)
        })
        .enter()
        .append('text')
        .attr('class', 'textData')
        .attr('x', function (d) {
          const time = modHour(d)
          return axis.getScaleX()(time)
        })
        .attr('y', function (d,i) {
          if (i % 2 === 0) {
            return 10
          } else {
            return 30
          }
        })
        .text(function (d) {
          return d.value
        })
        .attr('fill', function (d) {
          if (d.value === 'R') {
            return 'blue'
          } else {
            return '#000'
          }
        })
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '10')
  }
}