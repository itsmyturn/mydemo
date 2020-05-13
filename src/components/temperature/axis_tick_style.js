export class AxisTickStyle{
  constructor(){
    this.arr=['date','zhuYuanTianshu','shouShu','TI_GE_JIAN_CHATI_ZHONG','TI_GE_JIAN_CHASHEN_GAO','YE_TI_RU_LIANG_ml','NIAO_LIANG_ml','DA_BIAN_CI_SHU','PI_SHI_JIE_GUO','XUE_TANG_JIAN_CE_ZHImmolL','TE_SHU_ZHI_LIAO']
    this.arr2=['temperatureAndPulse','pain','hx']
    this.arr3=['xueYa']
  }
  getStrokeColor(name,index){
    if(this.arr2.includes(name)){
      if(name==='hx'){
        if(index%6===0&&index!==0){
          return 'red'
        }else{
          return '#000'
        }
        
      }
      if(index%6===0&&index!==0){
        return 'red'
      }else if(index===0){
        return '#000'
      }else{
        return '#ccc'
      }
    }
    if(this.arr.includes(name)){
      if(index!==0){
        return 'red'
      }else{
        return '#000'
      }
      
    }
    if(this.arr3.includes(name)){
      if(index%2===0&&index!==0){
        return 'red'
      }else{
        return '#000'
      }

    }
  }
  getStrokeWidth(name,index){
      if(this.arr2.includes(name)){
        if(index%6===0&&index!==0){
          return 2
        }else{
          return 1
        }
      }
      if(this.arr.includes(name)){
        if(index!==0){
          return 2
        }else{
          return 1
        }
        
      }
      if(this.arr3.includes(name)){
        if(index%2===0&&index!==0){
          return 2
        }else{
          return 1
        }

      }
  }
}