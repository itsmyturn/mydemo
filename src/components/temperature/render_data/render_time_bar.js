import * as d3 from 'd3'
// import {Axis} from '../draw_axis/axis.js'
// import {axisConfig} from '../draw_axis/axisconfig.js'
// let data=[{
//   'datetime': '2020-04-20 00:00:00',
//   'value': 2
// }, {
//   'datetime': '2020-04-20 04:00:00',
//   'value': 6
// }, {
//   'datetime': '2020-04-20 08:00:00',
//   'value': 10
// }, {
//   'datetime': '2020-04-20 12:00:00',
//   'value': 14
// }, {
//   'datetime': '2020-04-20 16:00:00',
//   'value': 18
// }, {
//   'datetime': '2020-04-20 20:00:00',
//   'value': 22
// }]
const timeAxisData = []
for (var i = 1; i <= 7; i++) {
  for (var j = 1; j <= 6; j++) {
    timeAxisData.push(j * 4 - 2)
  }
}
console.log(timeAxisData,'data')
export class TimeBar{
  constructor(){

  }
  renderData(){
    let width=570
    let height=20
    let timeBar =d3
      .select('g.axis_layout_time')
      .selectAll('g.time_bar')
      .data(timeAxisData)
      .enter()
      .append('g')
      .attr('class','time_bar')
      .attr('width', width/ 42)
      .attr('height', height)
      .attr('transform', function (d, i) {
        const move = i * width / 42-2
        return 'translate(' + move + ',0)'
      })
    timeBar
      .append('text')
      .attr('x', width / 42 / 2)
      .attr('y', height / 2)
      .attr('fill', function(d,i){
        //d表示当前数字，i表示索引，不能用数字作为判断条件
        if(d===2||d===18||d===22){
          return 'red'
        }else{
          return '#000'
        }

      })
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '10')
      .text(function (d) {
        console.log(d)
        return d
      })
  }
}