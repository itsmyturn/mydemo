export class ConnectLine{
  constructor(config){
    let {startX,startY,endX,endY,lineType,parent}=config
    this.startX=startX
    this.startY=startY
    this.endX=endX
    this.endY=endY
    this.lineType=lineType
    this.parent=parent
  }
  renderData(){
    if (this.startX === null || this.startY === null || this.endX === null || this.endY === null) {
      return false
    }
    let  line = this.parent
      .insert('g', 'g.CirclesWrap')
      .attr('class', 'line')
      .append('line')
      .attr('x1', this.startY)
      .attr('y1', this.startY)
      .attr('x2', this.endY)
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