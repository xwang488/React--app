// we get dom use react(useRef)
// the node we get dom in (useEffect)
// import './index.scss'
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
function Bar ({ title, xData, yData, style }) {
  const domRef = useRef()
  const chartInit = () => {
    const myChart = echarts.init(domRef.current)

    // Draw the chart
    myChart.setOption({
      title: {
        text: title
      },
      tooltip: {},
      xAxis: {
        data: xData
      },
      yAxis: {},
      series: [
        {
          name: 'sales',
          type: 'bar',
          data: yData
        }
      ]
    })
  }

  useEffect(() => {
    chartInit()
  })

  return (
    <div>
      {/* 准备一个挂载节点 */}
      <div ref={domRef} style={style}></div>
    </div>
  )
}
export default Bar

