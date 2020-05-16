import * as d3 from 'd3'
import {Axis} from '../draw_axis/axis.js'
import {axisConfig} from '../draw_axis/axisconfig.js'
import Point from '../point.js'
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
    this.renderPoint()
  }
  renderLine(){
    this.painLine = d3
      .line()
      .defined(function (d) {
        return d.pain != null
      })
      .x((d)=> {
        return this.axis.getScaleX()(new Date(d.datetime))
      })
      .y( (d)=> {
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
  renderPoint(){
    console.log('渲染疼痛点')
    let parent=d3.select('.axis_layout_pain')
     // 绘制疼痛数据点
     parent
     .append('g')
     .attr('class', 'CirclesWrap')
     .selectAll('g')
     .data(this.data)
     .enter()
     .filter(function (d) {
       return d.pain !== null && d.pain >= 0
     })
     .append('g')
     .attr('stroke', 'green')
     .attr('fill', 'green')
     .attr('transform', (d)=> {
       let point=new Point()
       let x = this.axis.getScaleX()(new Date(d.datetime))
       let y = this.axis.getScaleY()(d.pain)
       point.draw(parent,'pain',{x,y})
      //  if (d.pain === d.zt) {
      //    that.drawIcon(x, y, 'painAndZt')
      //  } else {
      //    that.drawPlus(x, y)
      //  }
       return 'translate(' + x + ', ' + y + ')'
     })
     .attr('cx', (d)=> {
       return this.axis.getScaleX(new Date(d.datetime))
     })
     .attr('cy', (d)=> {
       return this.axis.getScaleY(d.pain)
     })
     .attr('r', function () {
       return 5
     })
  }
}