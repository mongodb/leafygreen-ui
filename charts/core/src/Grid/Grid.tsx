import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { useEffect } from 'react';
import { useChartContext } from '../ChartContext';
import { getDefaultGridConfig } from './config';

export function Grid({
  horizontal,
  vertical,
}: {
  horizontal?: boolean;
  vertical?: boolean;
}) {
  const { updateChartOptions, darkMode } = useChartContext();
  const { theme } = useDarkMode(darkMode);

  useEffect(() => {
    updateChartOptions(getDefaultGridConfig({ horizontal, vertical, theme }));
  }, [theme]);

  return null;
}
