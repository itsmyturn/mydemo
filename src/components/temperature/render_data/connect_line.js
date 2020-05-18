export class ConnectLine{
  constructor(config){
    let {startX,startY,endX,endY,lineType,parent}=config
    if (startX === null || startY === null || endX === null || endY === null) {
      console.error(`${startX}\n${startY}\n${endX}\n${endY}其中一项发生错误`)
      return false
    }
    this.startX=startX
    this.startY=startY
    this.endX=endX
    this.endY=endY
    this.lineType=lineType
    this.parent=parent
    this.renderData()
  }
  renderData(){
    let  line = this.parent
      .insert('g','g.circle_wrap')
      .attr('class', 'connect_line')
      .append('line')
      .attr('x1', this.startX)
      .attr('y1', this.startY)
      .attr('x2', this.endX)
      .attr('y2', this.endY)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1)

    if (this.lineType === 'dashed') {
      line
        .attr('stroke-dasharray', '5,5')
    }
    if (this.lineType === 'solid') {
      line
        .attr('stroke-dasharray', '5,0')
    }
  }

}