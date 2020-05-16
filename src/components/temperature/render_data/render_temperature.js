import * as d3 from 'd3'
import {Axis} from '../draw_axis/axis.js'
import {axisConfig} from '../draw_axis/axisconfig.js'
import Point from '../point.js'
export class Temperature{
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
      tickFormatCallback:function (d){
        if (Math.floor(d) === d) {
            return d
        }
      },
      tickValueRange:[33.6,42,0.2],
      domainRange:[33.6, 42],
      valueRange:[500, 0]
    })

  }
  renderData(){
    this.renderLine()
    this.renderPoint()
  }
  getValue(d){
    return d.yw||d.kw||d.gw
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
      .attr('stroke', 'blue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1)
      .attr('class', 'line')
      .attr('d', this.line)
  }
  renderPoint(){
    this.parent
        .append('g')
        .attr('class','temperature_circles_wrap CirclesWrap')
        .selectAll('g')
        .data(()=>{
          return this.data.filter((d)=>{
            const val = this.getValue(d)
            return val && val >= 35 && val <= 42
          })
        })
        .enter()
        .append('g')
        .attr('transform', (d)=> {
          let point=new Point()
          var x = this.axis.getScaleX()(new Date(d.datetime))
          var y = this.axis.getScaleY()(this.getValue(d))
          point.draw(this.parent,'axillary',{x,y})
          // var mby = that.y2(d.ml)
          // var xly = that.y2(d.xl)
          // var equal = (y === mby) || (y === xly)
          // 使用了心率起搏器并且体温===心率 //不走下面的逻辑
          // if (d.pacemakerStatus && y === xly) {
          //   that.drawIcon(x, y - 15, 'pacemaker')
          // }
          // if (d.pacemakerStatus && y === xly) {
          // } else {
             // 腋温与脉搏重合
          // if (d.yw) {
          //   if (equal) {
          //     // that.drawIcon(x, y - 15, 'pacemaker')
          //     that.drawym(x, y)
          //   } else {
          //     that.drawCross(x, y)
          //   }
          // }
            // 口温与脉搏重合
          // if (d.kw) {
          //   if (equal) {
          //     // that.drawIcon(x, y - 15, 'pacemaker')
          //     that.drawkm(x, y)
          //   } else {
          //     that.drawCircle(x, y)
          //   }
          // }
            // 肛温与脉搏重合
          // if (d.gw) {
          //   if (equal) {
          //     // that.drawIcon(x, y - 15, 'pacemaker')
          //     that.drawgm(x, y)
          //   } else {
          //     that.drawEmptyCircle(x, y)
          //   }
          // }
          // }

          return 'translate(' + x + ',' + y + ')'
        })
  }
}