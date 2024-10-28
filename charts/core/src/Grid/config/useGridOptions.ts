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
      const updatedLineOptions = {
        splitLine: {
          show: true,
          lineStyle: {
            color:
              color[theme].border[Variant.Secondary][InteractionState.Default],
          },
        },
      };

      if (vertical) {
        updatedOptions.xAxis = updatedLineOptions;
      }

      if (horizontal) {
        updatedOptions.yAxis = updatedLineOptions;
      }

      return updatedOptions;
    });
  }, [horizontal, vertical, theme]);

  return options;
};
