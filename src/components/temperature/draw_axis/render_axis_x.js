import * as d3 from 'd3'
import {AxisTickStyle} from './axis_tick_style.js'//坐标轴tick样式接口
import {axisConfig} from './axisconfig.js'
import {Axis} from './axis.js'


export class AxisX{
  constructor(){
    
  }
  render(){//在svg中生成坐标轴
    let axisTickStyle=new AxisTickStyle()
    
    let nodes=d3.selectAll('g.axis_layout').nodes()
    nodes.forEach((node,index)=>{
      //x轴相关
      let axis=new Axis()
      let item=axisConfig[index]
      axis.setAxisConfig({
        tickSizeX:item.height,
        stepX:item.stepX
      })
      d3.select(nodes[index]).append('g')
      .attr('class','axisX')
      .call(axis.getAxisX())
      d3.select(nodes[index])
      .select(`g.axis_layout_${item.nameEn} g.axisX`)
      .selectAll('g.tick')
      .select('line')
      .attr('class', 'xAxisLine')
      .attr('stroke', function (d,i) {
        return axisTickStyle.getStrokeColor(item.nameEn,i)
      })
      .attr('stroke-width', function(d,i){
        return axisTickStyle.getStrokeWidth(item.nameEn,i)
      })
    })
    
  }
}