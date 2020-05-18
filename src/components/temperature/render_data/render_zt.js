import * as d3 from 'd3'
import {Axis} from '../draw_axis/axis.js'
import {axisConfig} from '../draw_axis/axisconfig.js'
import Point from '../point.js'
import {ConnectLine} from './connect_line.js'
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
     this.data.forEach(d=>{
      let point=new Point()
       let x = this.axis.getScaleX()(new Date(d.datetime)) || null
       let y = this.axis.getScaleY()(d.zt) || null
       let startY=this.axis.getScaleY()(d.pain) || null
       if (d.zt&&d.pain !== d.zt) {
        new ConnectLine({
          startX:x,
          startY:startY,
          endX:x,
          endY:y,
          lineType:'dashed',
          parent
        })
        point.draw(parent,'analgesia',{x,y})
       }
     })
  }
}