import * as d3 from 'd3'
import {Axis} from '../draw_axis/axis.js'
import {axisConfig} from '../draw_axis/axisconfig.js'
import Point from '../point.js'
import {toFixed} from '../util.js'
import {parseRePoint} from '../polygon.js'
export class Pulse{
  constructor(){
    this.data=[]
    this.height=500
    axisConfig.forEach(item=>{
      if(item.nameEn==='temperatureAndPulse'){
        this.height=item.height
        this.data=item.data.filter(item=>{
          return item.ml|| item.patientStatus
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
    this.test()
  }
  test(){
    // [[{x,y,value,point:{}}]]
      let mbData=[]
      let xlData=[]
      mbData=[]
      xlData=[]
      this.data.forEach((item)=>{
          mbData.push({
            point:item,
            value:item.ml,
            x:this.axis.getScaleX()(new Date(item.datetime)),
            y:this.axis.getScaleY()(item.ml),
            patientStatus:item.patientStatus
          })
          xlData.push({
            point:item,
            value:item.xl,
            x:this.axis.getScaleX()(new Date(item.datetime)),
            y:this.axis.getScaleY()(item.xl),
            patientStatus:item.patientStatus
          })
        })
      let polygonArray=parseRePoint(mbData,xlData)
      d3.select('.axis_layout_temperatureAndPulse').append('g')
      .attr('class','polygon')
      .html(()=>{
        return polygonArray
      })
    
  }
  getValue(d){
    return d.ml
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
      let  x = this.axis.getScaleX()(new Date(d.datetime))
      let  y = this.axis.getScaleY()(this.getValue(d))
      let temperatureY=this.temperatureAxis.getScaleY()(d.yw||d.kw||d.gw)
      let equal=toFixed(y)===toFixed(temperatureY)
      if(!equal){
        point.draw(this.parent,'pulse',{x,y})
      }
      if(d.ml>180||d.xl>180){
        point.draw(this.parent,'arrow',{x:x+10,y:y+2})
      }
    })
  }
}