import * as echart from 'echarts'

export default function useEchart(el: HTMLElement) {
  const echartInstance = echart.init(el, 'light', {
    renderer: 'svg'
  })

  const setOption = (options: echart.EChartsOption) => {
    echartInstance.setOption(options)
  }

  const resize = () => {
    echartInstance.resize()
  }

  window.addEventListener('resize', () => {
    resize()
  })

  return {
    echartInstance,
    setOption,
    resize
  }
}
