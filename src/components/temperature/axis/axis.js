//import {getEndTime} from './util.js'
import * as d3 from 'd3'

export class Axis{
  constructor(){
    //如果穿过来的数据小于7天，那就展示7天的，容器宽度需要自动计算？
    //getEndTime('2020-05-12 00:00:00')
    this.baseConfig={
      beginTime:new Date('2020-05-10 00:00:00'),//初始化传入
      endTime:new Date('2020-05-17 00:00:00'),//初始化传入
      containerWidth:568,//初始化传入
      containerHeight:50,//单独设置
      domainMax:'',//单独设置
      domainMin:'',//单独设置
      stepX:24,//多大间隔画x轴线 单位h 默认一天
      stepY:'',//多大间隔画y轴线
      start:'',//刻度起点
      end:'',
      tickSizeX:100,
      tickSizeY:-568
    }
    this.config=Object.assign({},this.baseConfig)
    
  }
  setAxisConfig(config){
    this.config=Object.assign(this.config,config)
  }
  getScaleX(){
    //比例尺
    let x=d3
      .scaleTime()
      .domain([this.config.beginTime,this.config.endTime])
      .range([0,this.config.containerWidth])
    return x
  }
  getAxisX(){
    let axisX=d3 
      .axisBottom(this.getScaleX())
      .tickValues(d3.timeHour.range(this.config.beginTime,this.config.endTime,this.config.stepX))
      .tickSize(this.config.tickSizeX)
      .tickFormat(function () {
        return 
      })
    return axisX
  }
  getScaleY(domainRange,valueRange){
    // console.log(domainRange,valueRange)
    let y = d3
      .scaleLinear()
      .domain(domainRange)//[-1, 11]
      .range(valueRange)//[100, -1]
    y.clamp(true)
    return y
  }
  getAxisY(rangeConfig,tickFormatCallback){
    let {tickValueRange,domainRange,valueRange}=rangeConfig
    let axisY = d3
      .axisLeft(this.getScaleY(domainRange,valueRange))
      .tickValues(d3.range(...tickValueRange))
      .tickSize(-568)
      .tickFormat(tickFormatCallback)
    return axisY
  }
}