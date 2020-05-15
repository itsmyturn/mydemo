import bloodData from "../data/blood_pressure.json"
import date from "../data/date.json"
import breathData from "../data/breath.json"
import data from "../data/normal.json"
let rowHeight=20
const axisConfig=[{
  "nameCn": "日期",
  "nameEn": "date",
  "top":0,
  "width":570/7,
  "height":rowHeight,
  "stepX":24,
  "data":date
  }, {
  "nameCn": "住院天数",
  "nameEn": "zhuYuanTianshu",
  "top":rowHeight,
  "width":570/7,
  "height":rowHeight,
  "stepX":24,
  "data":null
  }, {
  "nameCn": "术后日数",
  "nameEn": "shouShu",
  "top":rowHeight,
  "height":rowHeight,
  "stepX":24
}, {
  "nameCn": "时间",
  "nameEn": "time",
  "top":rowHeight,
  "height":rowHeight,
  "stepX":4,
  "timeBarType":"start2of12"
},
{
  "nameCn": "体温脉搏",
  "nameEn": "temperatureAndPulse",
  "top":rowHeight,
  "height":500,
  "stepX":4
},{
  "nameCn": "疼痛等级",
  "nameEn": "pain",
  "top":500,
  "height":100,
  "stepX":4
},{
  "nameCn": "呼吸(次/min) ",
  "nameEn": "hx",
  "top":100,
  "height":rowHeight*2,
  "stepX":4,
  "data":breathData
}, {
  "nameCn": "血压(mmHg)",
  "nameEn": "xueYa",
  "top":rowHeight*2,
  "height":rowHeight,
  "stepX":12,
  "data":bloodData
}, {
  "nameCn": "体重(kg)",
  "nameEn": "TI_GE_JIAN_CHATI_ZHONG",
  "top":rowHeight,
  "height":rowHeight,
  "stepX":24
}, {
  "nameCn": "身高(cm)",
  "nameEn": "TI_GE_JIAN_CHASHEN_GAO",
  "top":rowHeight,
  "height":rowHeight,
  "stepX":24
}, {
  "nameCn": "液体入量(ml)",
  "nameEn": "YE_TI_RU_LIANG_ml",
  "top":rowHeight,
  "height":rowHeight,
  "stepX":24
}, {
  "nameCn": "尿量(ml)",
  "nameEn": "NIAO_LIANG_ml",
  "top":rowHeight,
  "height":rowHeight,
  "stepX":24
}, {
  "nameCn": "大便次数",
  "nameEn": "DA_BIAN_CI_SHU",
  "top":rowHeight,
  "height":rowHeight,
  "stepX":24
}, {
  "nameCn": "皮试结果",
  "nameEn": "PI_SHI_JIE_GUO",
  "top":rowHeight,
  "height":rowHeight,
  "stepX":24
}, {
  "nameCn": "血糖(mmol/L)",
  "nameEn": "XUE_TANG_JIAN_CE_ZHImmolL",
  "top":rowHeight,
  "height":rowHeight,
  "stepX":24
}, {
  "nameCn": "特殊治疗",
  "nameEn": "TE_SHU_ZHI_LIAO",
  "top":rowHeight,
  "height":rowHeight,
  "stepX":24
}]

axisConfig.forEach((item)=>{
    item.data=item.data||data
    item.width=570/7
})
export{axisConfig}