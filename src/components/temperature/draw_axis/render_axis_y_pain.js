import * as d3 from 'd3'
import {Axis} from './axis.js'
export class PainAxisY{
  constructor(){
  }
  render(){
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
    d3.select('.painY')
      .selectAll('g.tick')
      .select('line')
      .attr('class','yAxisLine')
      .attr('stroke',function(){
        return '#ccc'
      })
      .attr('stroke-width',function(){
        return 1
      })
    let tickNumberParent=d3.select('.title_pain')
      .append('div')
      .attr('class','pain_box')
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