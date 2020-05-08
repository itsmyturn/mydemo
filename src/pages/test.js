import * as d3 from 'd3'
let {dataSource}=require('./datasource2.js')
let {AdaptData,AdaptSize}=require('../components/temperature/adaptData.js')
//适配体温单需要的数据
let adaptData=new AdaptData(dataSource)
let adaptSize=new AdaptSize(dataSource)
class Layout{
  constructor(){
    this.titleData=adaptData.getDynamicHeader()
    this.wrap=null
    this.titleWrap=null
    this.row=null
    this.colums=null
  }
  createWrap(){
    this.titleWrap=d3
      .select('.left_title')
      .append('svg')
      .attr('class','left_wrap_svg')
      .attr('width','100%')
      .attr('height','100%')
  }
  createRow(){
    this.row=this.titleWrap
      .selectAll('g')
      .data(this.titleData)
      .enter()
      .append('g')
      .attr('class',(d)=>{
        return `title_${d.nameEn} title`
      })
      .attr('transform',(d,i)=>{
        if(i<=2){
          return `translate(0,${i*adaptSize.getRowHeight()})`
        }else{
          if(d.nameEn==='hx'){
            return `translate(0,${adaptSize.getBreathTop()})`
          }else{//i-2 ？
            return `translate(0,${(i-2)*adaptSize.getRowHeight()+adaptSize.getBreathTop()})`
          }
        }
      })
    this.titleWrap.append('g') //体温
      .attr('class','title_temperature title')
      .attr('transform',function(){
        return `translate(0,${adaptSize.getTmpTop()})`
      })
    d3.selectAll('.title_temperature')
      .append('rect')
      .attr('width',()=>{
        return adaptSize.getTitleWidth()
      })
      .attr('height',()=>{
        return adaptSize.getTmpHeight()
      })
      .attr('fill','none')
      .attr('stroke','yellow')
    d3.selectAll('.title_temperature')
      .append('text')
      .attr('x',()=>{
        return 0
      })
      .attr('y',()=>{
        return 100
      })
      .text(()=>{
        return '体温单'
      })
    this.titleWrap.append('g') //疼痛
      .attr('class','title_pain title')
      .attr('transform',function(){
        return `translate(0,${adaptSize.getPainTop()})`
      })
      d3.selectAll('.title_pain')
      .append('rect')
      .attr('width',()=>{
        return adaptSize.getTitleWidth()
      })
      .attr('height',()=>{
        return adaptSize.getPainHeight()
      })
      .attr('fill','none')
      .attr('stroke','blue')
    d3.selectAll('.title_pain')
      .append('text')
      .attr('x',()=>{
        return 0
      })
      .attr('y',()=>{
        return 20
      })
      .text(()=>{
        return '疼痛单'
      })
    d3.selectAll('g.title')
      .filter((d)=>{
        return d
      })
      .append('rect')
      .attr('class','title_rect')
      .attr('width',()=>{
        return adaptSize.getTitleWidth()
      })
      .attr('height',(d)=>{
        if(d.nameEn==='hx'){
          return adaptSize.getBreathHeight()
        }else{
          return adaptSize.getRowHeight()
        }
        
      })
      .attr('fill','none')
      .attr('stroke','red')
    d3.selectAll('g.title')
      .filter((d)=>{
        return d
      })
      .append('text')
      .attr('class','title_text')
      .attr('x',()=>{
        return adaptSize.getTitleWidth()/2
      })
      .attr('y',(d)=>{
        if(d.nameEn==='hx'){
          return adaptSize.getRowHeight() 
        }else{
          return adaptSize.getRowHeight()/2
        }
        
      })
      .text((d)=>{
        return d.nameCn
      })
      .attr('text-anchor','middle')
      .attr('dominant-baseline','middle')
      .attr('font-size',14)
  }
  createColum(){

  }
}
export{
  adaptData,
  adaptSize,
  Layout
}