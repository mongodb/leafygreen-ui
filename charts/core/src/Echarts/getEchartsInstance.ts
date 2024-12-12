// Create a singleton promise to handle the initialization
let initPromise: Promise<void> | null = null;
let echartsCore: any;
let echartsCharts: any;
let echartsRenders: any;
let echartsComponents: any;

async function initializeEcharts() {
  // If already initialized, return immediately
  if (echartsCore) {
    return;
  }

  // If initialization is in progress, wait for it
  if (initPromise) {
    return initPromise;
  }

  // Start initialization and store the promise
  initPromise = (async () => {
    const [
      echartsCoreResolved,
      echartsChartsResolved,
      echartsRendersResolved,
      echartsComponentsResolved,
    ] = await Promise.all([
      import('echarts/core'),
      import('echarts/charts'),
      import('echarts/renderers'),
      import('echarts/components'),
    ]);

    echartsCore = echartsCoreResolved;
    echartsCharts = echartsChartsResolved;
    echartsRenders = echartsRendersResolved;
    echartsComponents = echartsComponentsResolved;

    echartsCore.use([
      echartsCharts.LineChart,
      echartsRenders.CanvasRenderer,
      echartsComponents.TitleComponent,
      echartsComponents.TooltipComponent,
      echartsComponents.GridComponent,
      echartsComponents.LegendComponent,
      echartsComponents.ToolboxComponent,
      echartsComponents.DataZoomComponent,
      echartsComponents.DataZoomInsideComponent,
    ]);
  })();

  return initPromise;
}

export async function getEchartsInstance(container: HTMLElement | null) {
  await initializeEcharts();
  return { instance: echartsCore.init(container), core: echartsCore };
}
