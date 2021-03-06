import * as d3 from 'd3'
import {modHour} from '../util.js'
import {Axis} from '../draw_axis/axis.js'
import {DataSourceSingle} from '../datasource_adapter.js'
export class Event{
  constructor(command){
    this.data=[]
    this.command=command
    new DataSourceSingle().forEach(item=>{
      if(item.nameEn==='temperatureAndPulse'){
        this.data=item[this.command]
        this.temperatureRange=item.temperatureRange
        this.height=item.height
      }
    })
    this.parent=d3.select('.axis_layout_temperatureAndPulse')
    this.axis=new Axis()
    let temperatureMin=this.temperatureRange.min
    let temperatureMax=this.temperatureRange.max
    this.axis.setAxisConfig({
      tickValueRange:[temperatureMin,temperatureMax,0.2],
      domainRange:[temperatureMin, temperatureMax],
      valueRange:[this.height, 0]
    })
  }
  renderData(){
    if (!this.data.length) return false
    this.parent
      .append('g')
      .attr('class', 'textWrap')
      .selectAll('g')
      .data(()=>{
        return this.data.filter(d=>d.value)
      })
      .enter()
      .append('g')
      .attr('class', 'textItem')
      .attr('transform', (d) =>{
        let  x = this.axis.getScaleX()(modHour(d))-5
        let y=this.axis.getScaleY()(35)+10
        if (this.command === 'statusUp') {
          return 'translate(' + x + ',10)'
        } else if (this.command === 'statusDown') {
          return 'translate(' + x + ','+y+')'
        }
      })
      .selectAll('text')
      .data(function (d) {
        var txt = d.value
        return txt.split('')
      })
      .enter()
      .append('text')
      .attr('class', 'text')
      .attr('x', function (d) {
        if (d === '|') {
          return 5
        }
      })
      .attr('y', function (d, i) {
        return i * 12
      })
      .attr('font-size', '10')
      .attr('fill', 'red')
      .attr('stroke-width', 1)
      .text(function (d) {
        return d
      })
  }

}
