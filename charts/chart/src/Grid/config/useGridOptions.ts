import { useEffect, useState } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

import { ChartOptions } from '../../Chart';
import { GridProps } from '../Grid.types';

export const useGridOptions = ({ horizontal, vertical }: GridProps) => {
  const [options, setOptions] = useState<Partial<ChartOptions>>({});
  const { theme } = useDarkMode();

  useEffect(() => {
    setOptions(prevOptions => {
      const updatedOptions = { ...prevOptions };
      const getUpdatedLineOptions = (show: boolean) => ({
        splitLine: {
          show: show,
          lineStyle: {
            color:
              color[theme].border[Variant.Secondary][InteractionState.Default],
          },
        },
      });
      updatedOptions.xAxis = getUpdatedLineOptions(!!vertical);
      updatedOptions.yAxis = getUpdatedLineOptions(!!horizontal);
      return updatedOptions;
    });
  }, [horizontal, vertical, theme]);

  return options;
};
