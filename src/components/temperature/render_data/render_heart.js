import * as d3 from 'd3'
import {Axis} from '../draw_axis/axis.js'
import {axisConfig} from '../draw_axis/axisconfig.js'
import Point from '../point.js'
import {toFixed} from '../util.js'
export class Heart{
  constructor(){
    this.data=[]
    this.height=500
    axisConfig.forEach(item=>{
      if(item.nameEn==='temperatureAndPulse'){
        this.height=item.height
        this.data=item.data.filter(item=>{
          return item.xl|| item.patientStatus
        })
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
      valueRange:[this.height, 0]
    })
    this.temperatureAxis=new Axis()
    this.temperatureAxis.setAxisConfig({
      tickFormatCallback:function (d){
        if (Math.floor(d) === d) {
            return d
        }
      },
      tickValueRange:[33.6,42,0.2],
      domainRange:[33.6, 42],
      valueRange:[this.height, 0]
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
    this.data.forEach(d=>{
      let point=new Point()
          var x = this.axis.getScaleX()(new Date(d.datetime))
          var y = this.axis.getScaleY()(this.getValue(d))
          let temperatureY=this.temperatureAxis.getScaleY()(d.yw||d.kw||d.gw||null)
          let equal=toFixed(y)===toFixed(temperatureY)
          if(!equal){
            if(d.ml===d.xl){
              point.draw(this.parent,'overlap',{x,y,overlapType:'pulseAndHeart'})
            }else{
              if(d.ml>180&&d.xl>180)return 
              if(d.pacemakerStatus){
                point.draw(this.parent,'heart',{x,y,peaceMaker:true})
              }else{
                point.draw(this.parent,'heart',{x,y})
              }
              
            }  
          }
    })
    
  }
}