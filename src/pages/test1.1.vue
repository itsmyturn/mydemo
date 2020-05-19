<template>
<div>
    <div class="container" ref="container"></div>
</div>
</template>

<script>
// import Highcharts from 'highcharts';
import HighchartsGantt from 'highcharts/highcharts-gantt';
// console.log(HighchartsGantt,'123')

export default {
  name: 'highcharts',
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      // console.log(this.$el);
      this.$el.style.width = 800 + 'px';
      this.$el.style.height = 400+ 'px';
      // THE CHART
// THE CHART
HighchartsGantt.ganttChart(this.$refs.container, {
	title: {
		text: 'Gantt Chart with Progress Indicators'
	},
	xAxis: {
		min: Date.UTC(2014, 10, 17),
		max: Date.UTC(2014, 10, 30)
	},
	series: [{
		name: 'Project 1',
		data: [{
			name: 'Start prototype',
			start: Date.UTC(2014, 10, 18),
			end: Date.UTC(2014, 10, 25),
			completed: 0.25
		}, {
			name: 'Test prototype',
			start: Date.UTC(2014, 10, 27),
			end: Date.UTC(2014, 10, 29)
		}, {
			name: 'Develop',
			start: Date.UTC(2014, 10, 20),
			end: Date.UTC(2014, 10, 25),
			completed: {
				amount: 0.12,
				fill: '#fa0'
			}
		}, {
			name: 'Run acceptance tests',
			start: Date.UTC(2014, 10, 23),
			end: Date.UTC(2014, 10, 26)
		}]
	}]
});

    }
  }
}
</script>

<style lang="scss">
  .highcharts-container {
    width: 800px;
    height: 400px;
  }
</style>