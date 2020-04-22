<template>
    <div id="chart"></div>
</template>
<script>
import { dataSource } from './datasource.js'
import {Chart} from './temperature.js'
export default { // authority权限控制，1只读，2可打印
  data () {
    return {
      beginDate: '2020-04-20 00:00:00',
      patientInfo: null,
      obj: null,
      options: {
        id: 'chart',
        beginTime: '',
        width: 700,
        height: 900,
        dataSource: null
      }
    }
  },
  computed: {
    formatVal: function (obj, name) {
      return (obj, name) => {
        if (name === 'birthday' || name === 'enterDate') {
          if (!obj.data[name]) return '--'
          return obj.data[name]
        } else {
          return obj.data[name] || '--'
        }
      }
    }
  },
  
  mounted () {
    this.getChartData()
  },
  methods: {
    getChartData () {
      this.patientInfo = dataSource.patientInfo
      this.options.dataSource = dataSource
      this.options.beginTime = this.beginDate
      setTimeout(() => {
        this.obj = new Chart(this.options)
      }, 1000)
      
    },
  }
}

</script>
<style scoped>
@page{
  margin-left:2cm;
}
.temperatureChart {
  width: 730px;
  background: #fff;
  margin:0 auto;
  padding:20px 0 70px;
}
.temperatureHeader {
  text-align: center;
  margin: 10px;
}
.temperatureRow {
  padding: 0;
  font-size: 12px;
  line-height: 16px;
  text-align: left;
  font-weight: bold;
  margin-bottom: 6px;
  display:flex;
  justify-content: space-between;
  flex-wrap:wrap;
}
.temperatureRow li {
  padding: 0 2px;
}

.temperatureRow .el-col {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.dateRow {
  line-height: 36px;
  -padding: 0 15px;
}

.printShowLogo {
  display: none;
  width: 300px;
  height: 50px;
}
.printBody .printShowLogo {
  display: block;
}
.CirclesWrap text{
  font:6px;
}
</style>
