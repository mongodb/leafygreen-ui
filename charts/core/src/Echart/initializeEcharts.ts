// Singleton promise for initialization to prevent duplication
let initPromise: Promise<typeof import('echarts/core')> | null = null;
let echartsCore: typeof import('echarts/core') | null = null;
let echartsCharts: typeof import('echarts/charts') | null = null;
let echartsRenders: typeof import('echarts/renderers') | null = null;
let echartsComponents: typeof import('echarts/components') | null = null;

/**
 * Initializes ECharts core and required components in a singleton pattern.
 * Dynamically imports and configures ECharts modules including charts,
 * renderers, and components. Subsequent calls return the cached module to
 * prevent duplicate initialization.
 *
 * @returns Promise resolving to the initialized ECharts core module
 * @throws If module imports or initialization fails
 *
 * @example
 * const echarts = await initializeEcharts();
 * // Use initialized echarts module
 */
export async function initializeEcharts(): Promise<
  typeof import('echarts/core')
> {
  // If already initialized, return echartsCore immediately
  if (echartsCore) {
    return echartsCore;
  }

  // If initialization is in progress, wait for it
  if (initPromise) {
    return initPromise;
  }

  // Start initialization and store the promise
  initPromise = (async () => {
    try {
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

      // Registers any component we need to use. This is necessary to facilitate tree shaking.
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
        echartsComponents.MarkLineComponent,
        echartsComponents.MarkPointComponent,
      ]);

      return echartsCore;
    } catch (error) {
      // Ensure we clear the promise if initialization fails
      initPromise = null;
      throw error;
    }
  })();

  return initPromise;
}
