import React from 'react'
import ReactEcharts from 'echarts-for-react'
import * as echarts from 'echarts/core';
import chinaJson from './china'
import sdata from './data'

echarts.registerMap('china', {
  geoJSON: chinaJson
})

function ChinaMap() {
  return (
      <ReactEcharts
        option={getChartOption()}
        style={{ width: '100%', height: '100%' }}
      />
    )
}

function getChartOption() {
  return {
    backgroundColor: '#404a59',
    title: {
      left: 10,
      right: 10,
      text: '中国地图',
      textStyle: {
        color: '#fff',
      },
    },
    tooltip: {
      trigger: 'item',
      // formatter: function (params) {
      //   const { data, name: cityName } = params.data
      //   const { is_first_city } = data
      //   let html = `${cityName} (${is_first_city === 0 ? '非一线' : '一线'})`
      //   for (let [key] of NAME_MAP) {
      //     html += `<br>${data[key]}`
      //   }
      //   return html
      // },
    },
    legend: {
      orient: 'vertical',
      y: 'bottom',
      x: 'right',
      textStyle: {
        color: '#fff',
      },
    },
    geo: {
      map: 'china',
      zoom: 1.2,
      scaleLimit: {
        min: 0.5,
        max: 3,
      },
      roam: true,
      itemStyle: {
        areaColor: '#323c48',
        borderColor: '#111',
      },
      emphasis: {
        label: {
          show: false,
        },
        itemStyle: {
          areaColor: '#60758e',
        }
      }
    },
    series: [
      {
        name: '正常',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: sdata,
        symbolSize: function (val) {
          return Math.log(val[2]) * 2
        },
        itemStyle: {
          color: '#9c27b0',
        },
      }
    ],
  }
}

const NAME_MAP = new Map([
  ['marking_count'],
  ['low_quality_rate'],
  ['old_news_rate'],
  ['vulgar_rate'],
])

export default ChinaMap
