
import Axillary from './draw_icon/axillary.js'
import Oral from './draw_icon/oral.js'
import Anal from './draw_icon/anal.js'
import Cooling from './draw_icon/cooling.js'
import Pulse from './draw_icon/pulse.js'
import Heart from './draw_icon/heart.js'
import Pain from './draw_icon/pain.js'
import Analgesia from './draw_icon/analgesia.js'
import Overlap from './draw_icon/overlap.js'
export default class Point{//提供点的渲染，处理点交叉的逻辑
  constructor(){
    //对象形式
    this.pointMap={
      axillary:new Axillary(),
      oral:new Oral(),
      anal:new Anal(),
      cooling:new Cooling(),
      pulse:new Pulse(),
      heart:new Heart(),
      analgesia:new Analgesia(),
      pain:new Pain(),
      overlap:new Overlap()
    }
  }
  draw(root,name,config={}){
    if(this.pointMap[name]){
      this.pointMap[name].draw(root,config)
    }else{
      console.error(`不支持name为${name}绘制图标`)
    }
  }
}

/**
 * AxillaryTemperature 腋温 1
 * OralTemperature 口温 1
 * AnalTemperature 肛温 1
 * Cooling 降温 1
 * PulseRate 脉率 1
 * HeatrRate 心率 1
 * PulsePacemaker 脉搏起搏器 1
 * Pain 疼痛 1
 * Analgesia 镇痛 1
 * 
 * OverLap 重叠
 * OverStandard 超标
 * 腋温与脉搏重叠
 * 口温与脉搏重叠
 * 肛温和脉搏重叠
 * 脉搏和心率重叠
 * 体温和使用心率起搏器重叠
 * 疼痛和镇痛重叠
*/