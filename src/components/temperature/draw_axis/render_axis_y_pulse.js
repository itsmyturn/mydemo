import * as d3 from 'd3'
import {Axis} from './axis.js'
export class PulseAxisY{
  constructor(){
  }
  render(){
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
      .attr('class','pulse_box')
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
    this.drawTitleText()
  }
  drawTitleText(){
    let textArr=['脉搏','(次/分)']
    d3.select('.pulse_box').selectAll('p')
    .data(textArr)
    .enter()
    .append('p')
    .style('height','20px')
    .style('line-height','20px')
    .style('position','absolute')
    .style('left',0)
    .style('top',(d,i)=>{
      return `${i*20}px`
    })
    .text((d)=>d)
  }
}