// import * as d3 from 'd3'
import {RenderAxis} from '../components/temperature/draw_axis/render_axis.js' //坐标轴接口
import {DrawIconTest} from '../components/temperature/point.js'
import {RenderData} from '../components/temperature/render_data/render_index.js'
export function axisTest(){
  let renderAxis=new RenderAxis()
  renderAxis.render()//坐标轴
  DrawIconTest()//图标测试
  new RenderData().renderData() //数据
  
}