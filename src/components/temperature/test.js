import {RenderAxis} from './draw_axis/render_axis.js' //坐标轴接口
// import {DrawIconTest} from './point.js'
import {RenderData} from './render_data/render_index.js'
import {Layout} from './layout.js'
//疼痛相关的 
import {Pain} from './render_data/render_pain.js'
import {Zt} from './render_data/render_zt.js'
import {PainAxisY}from './draw_axis/render_axis_y_pain'

//绘制多边形
// import * as d3 from 'd3'
// import {parseRePoint} from './polygon.js'


function renderpain(){
  new PainAxisY().render()
  new Pain().renderData()
  new Zt().renderData()
  
}
let arr=[
  {a:1,b:1,c:false},
  {a:2,b:2,c:true},
  {a:3,b:3,c:false},
  {a:4,b:4,c:false},
  {a:5,b:5,c:true},
  {a:6,b:6,c:false},
]
function splitGroup(){ 
  let result=arr
  console.log(result)
  // result为[[{a:1,b:1,c:false}],[{a:3,b:3,c:false},{a:4,b:4,c:false}],[{a:6,b:6,c:false}]]
}
export function axisTest(){
  new Layout()//简单布局
  new RenderAxis().render()//坐标轴
  new RenderData().renderData() //数据
  renderpain()
  splitGroup()
  
}