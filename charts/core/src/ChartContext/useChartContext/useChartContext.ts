import { useContext } from 'react';

import { ChartContext } from '../ChartContext';

export const useChartContext = () => {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error('useChartContext must be used within a ChartProvider');
  }

  return context;
};
