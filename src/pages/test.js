import {RenderAxis} from '../components/temperature/draw_axis/render_axis.js' //坐标轴接口
import {DrawIconTest} from '../components/temperature/point.js'
import {RenderData} from '../components/temperature/render_data/render_index.js'
import {Layout} from '../components/temperature/layout.js'
export function axisTest(){
  new Layout()//简单布局
  new RenderAxis().render()//坐标轴
  new RenderData().renderData() //数据
  DrawIconTest()//图标测试
}