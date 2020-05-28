import {configData} from './configdata.js'
function print(name,data){
  // console.log(`数据${name}`,data)
}
//体温脉搏
let temperatureAndPulse='temperatureAndPulse'
//疼痛等级
let pain='pain'
//呼吸
let hx='hx'
class DataSourceAdapter{
  constructor(dataSource){
    this.originalData=dataSource
    this.chartType=Number(dataSource.charType)
    this.data=configData.map(item=>{
      if(this.chartType===1){
        if(item.nameEn===pain){
          item.show=false
        }else{
          item.show=true
        }
      }else{
        item.show=true
      }
      return item
    })
  }
  getData(){
    this.getTemperatureData()
    this.getPainData()
    this.getDynamicTable()
    return this.data
  }
  getTemperatureData(){
    this.data.forEach(item=>{
      if(item.nameEn===temperatureAndPulse){
        print(item.nameCn,this.originalData.chartData)
        print('事件上',this.originalData.statusUp)
        print('事件下',this.originalData.statusDown)
        //体温脉搏相关数据
        item.data=this.originalData.chartData || []
        item.statusUp=this.originalData.statusUp||[]
        item.statusDown=this.originalData.statusDown||[]
        //高度
        item.height=this.chartType===1?600:500
      }
    })
  }
  getPainData(){
    this.data.forEach(item=>{
      if(item.nameEn===pain){
        print(item.nameCn,this.originalData.painData)
        item.data=this.originalData.painData || []
        item.top=this.chartType===1?0:500
        item.height=this.chartType===1?0:100
      }
    })
  }
  getDynamicTable(){
    let dyanmicTableData=this.originalData.dynamicTable.data
    this.data.forEach(item=>{
      if(dyanmicTableData[item.nameEn]){
        item.data=dyanmicTableData[item.nameEn]
      }
      if(item.nameEn===hx){
        item.top=this.chartType===1?600:100
      }
    })
  }
  
}
export let DataSourceSingle=(function(){
  let instance
  return function(data){
    if(!instance){
      instance=new DataSourceAdapter(data)
    }
    return instance.getData()
  }
})()