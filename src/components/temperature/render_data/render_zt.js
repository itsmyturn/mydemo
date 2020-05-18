import * as d3 from 'd3'
import {Axis} from '../draw_axis/axis.js'
import {axisConfig} from '../draw_axis/axisconfig.js'
import Point from '../point.js'
export class Zt{
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
    this.renderPoint()
  }
  renderPoint(){
    let parent=d3.select('.axis_layout_pain')
     // 绘制镇痛数据点
     parent
     .append('g')
     .attr('class', 'CirclesWrap')
     .selectAll('g')
     .data(this.data)
     .enter()
     .filter(function (d) {
       return d.pain !== null && d.pain >= 0 && d.zt
     })
     .append('g')
     .attr('transform', (d)=> {
       let point=new Point()
       let x = this.axis.getScaleX()(new Date(d.datetime))
       let y = this.axis.getScaleY()(d.zt)
       
       if (d.pain === d.zt) {
        // point.draw(parent,'overlap',{x,y,overlapType:'painAndAnalgesia'})
       } else {
        point.draw(parent,'analgesia',{x,y})
       }
       return 'translate(' + x + ', ' + y + ')'
     })
     .attr('cx', (d)=> {
       return this.axis.getScaleX(new Date(d.datetime))
     })
     .attr('cy', (d)=> {
       return this.axis.getScaleY(d.zt)
     })
     .attr('r', function () {
       return 5
     })
  }
}