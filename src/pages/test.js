import * as d3 from 'd3'
import {dataSource} from './datasource2.js'
import {AdaptData,AdaptSize} from '../components/temperature/adaptData.js'
import Point from '../components/temperature/point.js'

//适配体温单需要的数据
let adaptData=new AdaptData(dataSource)
let adaptSize=new AdaptSize(dataSource)
function DrawIconTest(){
 d3.selectAll('.icon').insert('svg','p')
  .attr('width',30)
  .attr('height',20)
  .append('g')
  .attr('class','g-icon')
  .attr('transform','translate(0,0)')
  let nodes=d3.selectAll('g.g-icon').nodes()
  let point=new Point()
  point.draw(d3.select(nodes[0]),'axillary',{x:10,y:10})
  point.draw(d3.select(nodes[1]),'oral',{x:10,y:10})
  point.draw(d3.select(nodes[2]),'anal',{x:10,y:10})
  point.draw(d3.select(nodes[3]),'cooling',{x:10,y:10})
  point.draw(d3.select(nodes[4]),'pulse',{x:10,y:10})
  point.draw(d3.select(nodes[5]),'heart',{x:10,y:10})
  point.draw(d3.select(nodes[6]),'heart',{x:10,y:10,peaceMaker:true})
  point.draw(d3.select(nodes[7]),'pain',{x:10,y:10})
  point.draw(d3.select(nodes[8]),'analgesia',{x:10,y:10})
  point.draw(d3.select(nodes[9]),'overlap',{x:10,y:10,overlapType:'axillaryAndHeart'})
  point.draw(d3.select(nodes[10]),'overlap',{x:10,y:10,overlapType:'oralAndHeart'})
  point.draw(d3.select(nodes[11]),'overlap',{x:10,y:10,overlapType:'analAndHeart'})
  point.draw(d3.select(nodes[12]),'overlap',{x:10,y:10,overlapType:'pulseAndHeart'})
  point.draw(d3.select(nodes[13]),'overlap',{x:10,y:10,overlapType:'painAndAnalgesia'})
}
class Layout{
  constructor(){
    this.titleData=adaptData.getDynamicHeader()
    this.wrap=null
    this.titleWrap=null
    this.row=null
    this.colums=null
    DrawIconTest()
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