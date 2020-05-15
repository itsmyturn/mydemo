import * as d3 from 'd3'
import {Axis} from '../draw_axis/axis.js'
import {axisConfig} from '../draw_axis/axisconfig.js'
import {filterTime} from '../../../pages/util.js'
export class BloodPressure{
  constructor(){
    this.data=[]
    axisConfig.forEach(item=>{
      if(item.nameEn==='xueYa'){
        this.data=item.data
      }
    })
  }
  renderData(){
      let axis=new Axis()
      d3.select('.axis_layout_xueYa')
        .selectAll('g.bloodData')
        .data(()=>{
          return this.data.filter((d)=>d.value)
        })
        .enter()
        .append('g')
        .classed('bloodData',true)
        .attr('transform',(d,index)=>{
          this.appendAmAndPm(d.value, index)
          let x=axis.getScaleX()(new Date(d.datetime))
          let y=20/2
          return `translate(${x},${y})`
        })  
  }
  appendAmAndPm (arr, index) {
    let amArr = filterTime('am', arr).splice(-1)
    let pmArr = filterTime('pm', arr).splice(-1)
    let lastArr = [...amArr, ...pmArr]
    let bloodNodes = d3.selectAll('g.bloodData').nodes()
    d3.select(bloodNodes[index])
      .selectAll('text.bloodDataItem')
      .data(function () {
        return lastArr
      })
      .enter()
      .append('text')
      .attr('class', 'bloodDataItem')
      .attr('x', function (d) {
        let hour = new Date(d.datetime).getHours()
        if (hour < 12) {
          return 20
        }
        if (hour >= 12) {
          return 60
        }
      })
      .text(function (d) {
        var val = d.value
        if (!val['min'] || !val['max']) return
        return val['min'] + '/' + val['max']
      })
      .attr('fill', 'red')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '10')
  }
}