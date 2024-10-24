import { useEffect } from 'react';

import { useChartContext } from '../ChartContext';

import { useGridOptions } from './config';
import { GridProps } from './Grid.types';

export function Grid({ horizontal = true, vertical = true }: GridProps) {
  const { updateChartOptions } = useChartContext();
  const gridOptions = useGridOptions({ horizontal, vertical });

  useEffect(() => {
    updateChartOptions(gridOptions);
  }, [gridOptions]);

  return null;
}

Grid.displayName = 'Grid';
