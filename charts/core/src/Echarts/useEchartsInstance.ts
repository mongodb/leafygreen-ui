import { useEffect, useRef, useState } from 'react';

// Type for the ECharts instance
type EchartsType = any;

interface UseEchartsResult {
  chart: EchartsType | null;
  isLoading: boolean;
  error: Error | null;
  echarts: any;
}

// Singleton promise for initialization
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
    } catch (error) {
      // Ensure we clear the promise if initialization fails
      initPromise = null;
      throw error;
    }
  })();

  return initPromise;
}

export function useEchartsInstance(
  container: HTMLDivElement | null,
): UseEchartsResult {
  const [chart, setChart] = useState<EchartsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function setupChart() {
      try {
        setIsLoading(true);
        setError(null);

        await initializeEcharts();

        if (container) {
          const newChart = echartsCore.init(container);
          console.log('post init');
          setChart(newChart);
        }
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err
            : new Error('Failed to initialize ECharts'),
        );
      } finally {
        setIsLoading(false);
      }
    }

    setupChart();

    // Cleanup function
    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, [container]);

  return { chart, echarts: echartsCore, isLoading, error };
}
