import {BloodPressure} from './render_blood_pressure.js'
import {Normal7} from './render_normal7.js'
import {Breath} from './render_breath.js'
import {TimeBar} from './render_time_bar.js'
export class RenderData{
  constructor(){
    // this.renderData()
  }
  renderData(){
    //正常的7列数据渲染
    new Normal7().renderData()
    //血压数据渲染
    new BloodPressure().renderData()
    // 呼吸数据渲染
    new Breath().renderData()
    //时间轴
    new TimeBar().renderData()
  }
}