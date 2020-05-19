import {RenderAxis} from './draw_axis/render_axis.js' //坐标轴接口
import {DrawIconTest} from './point.js'
import {RenderData} from './render_data/render_index.js'
import {Layout} from './layout.js'
//疼痛相关的 
import {Pain} from './render_data/render_pain.js'
import {Zt} from './render_data/render_zt.js'
import {PainAxisY}from './draw_axis/render_axis_y_pain'

function renderpain(){
  new PainAxisY().render()
  new Pain().renderData()
  new Zt().renderData()
  
}
export function axisTest(){
  new Layout()//简单布局
  new RenderAxis().render()//坐标轴
  new RenderData().renderData() //数据
  // renderpain()
  DrawIconTest()//图标测试
}