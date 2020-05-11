let baseConfig={
  rowHeight:20,
  titleWidth:130,
  contentWidth:'100%',
  height:900,
  id:''
}
class AdaptData{//在这个类中就处理好后端返回的各种数据，就不要再内容进行处理了
  constructor(data){
    this.data=data
  }
  getDynamicDataLength(){//H获取动态数据的长度
    return this.data.dynamicTable.header.length
  }
  getDynamicHeader(){//获取动态头部信息
    return this.data.dynamicTable.header
  }
  getDynamicData(){//获取动态数据信息
    return this.data.dynamicTable.data
  }
  getPainData(){//获取疼痛数据
    let painData=[]
    if(this.data.painData){
      painData=this.data.painData.filter(item=>item.pain!=null)
    }
    return painData
  }
  getEventsUp(){//手术，入院，出院，分娩，转科事件
    return this.data.statusUp
  }
  getEventsDown(){//外出和拒测事件
    return this.data.statusDown
  }
  getChartType(){//1 体温单 2 疼痛单类型
    return Number(this.data.charType)
  }
  getTmpData(){//体温数据
    let tmpData=[]
    tmpData=this.data.chartData.filter(item=>{//腋温口温肛温有一个有值，并且不是外出拒测状态
      return item.yw||item.kw||item.gw||item.patientStatus
    })
    return tmpData
  }
  getPulseData(){//脉搏心率数据
    let pulseData=[]
    pulseData=this.data.chartData.filter(item=>{//心率脉率有一个有值，并且不是外出拒测状态
      return item.ml||item.xl||item.patientStatus
    })

    return pulseData
  }
}
class AdaptSize{//处理尺寸
  constructor(data){
    this.adaptdata=new AdaptData(data)
    this.baseConfig=baseConfig
  }
  getTitleWidth(){
    return this.baseConfig.titleWidth
  }
  getRowHeight(){
    return this.baseConfig.rowHeight
  }
  getPainTop(){
    return this.getTmpTop()+this.getTmpHeight()
  }
  getPainHeight(){//疼痛布局的高度
    if(this.adaptdata.getChartType()===1){
      return 0
    }else if(this.adaptdata.getChartType()===2){
      return 100
    }
  }
  getTmpTop(){
    return this.baseConfig.rowHeight*3
  }
  getTmpHeight(){//体温脉搏的高度
    
    let dynamicDataLen=this.adaptdata.getDynamicDataLength() //动态数据的length
    let painHeight=this.getPainHeight()
    let rowHeight=this.baseConfig.rowHeight
    let height=this.baseConfig.height
    //总高-动态数据的高度-时间轴的高度-疼痛高度 (呼吸占了两行高度所以多减去一个高度)
    let tmpHeight=height-(dynamicDataLen)*rowHeight-painHeight-rowHeight
    return tmpHeight
  }
  getEventsDownTop(){//
    if(this.adaptdata.getChartType()===1){
      return 530   //每个格子是15 h620/42
    }else if(this.adaptdata.getChartType()===2){
      return 444
    }
  }
  getBreathHeight(){//呼吸的高度
    return this.baseConfig.rowHeight*2
  }
  getBreathTop(){
    //日期+住院天数+术后日数+体温高度+疼痛高度
    return this.baseConfig.rowHeight*3+this.getPainHeight()+this.getTmpHeight()
  }
  getDynamicDataTop(){
    return this.getBreathTop()+this.baseConfig.rowHeight
  }
  getEventsUpTop(){
    return 0
  }
}
export{
  AdaptData,
  AdaptSize
}