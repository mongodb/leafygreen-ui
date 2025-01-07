import { useEffect } from 'react';
import { useChartContext } from '../ChartContext';

export function ThresholdLine({ point }: { point: number }) {
  const { chart } = useChartContext();

  useEffect(() => {
    if (!chart.ready) return;

    // chart.updateOptions({
    //   markLine: {
    //     data: [
    //       {
    //         name: 'Event',
    //         xAxis: 1591675953436.9065,
    //         label: {
    //           formatter: 'Important Event',
    //         },
    //         lineStyle: {
    //           color: '#ff0000',
    //         },
    //       },
    //     ],
    //   },
    // });

    return () => {
      /**
       * Remove...
       */
      // chart.removeSeries(name);
    };
  }, [chart.ready, point]);

  return null;
}
