import React, { forwardRef } from 'react';
import { colors } from '@lg-charts/colors';
import { useSeriesContext } from '@lg-charts/series-provider';

import Checkbox from '@leafygreen-ui/checkbox';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getLegendCheckboxStyles } from './LegendCheckbox.styles';
import { LegendCheckboxProps } from './LegendCheckbox.types';

export const LegendCheckbox = forwardRef<HTMLInputElement, LegendCheckboxProps>(
  ({ className, name, ...rest }, fwdRef) => {
    const { theme } = useDarkMode();
    const { getSeriesIndex } = useSeriesContext();

    const themedColors = colors[theme];
    const colorIndex = name ? getSeriesIndex(name) % themedColors.length : -1; // loop through colors if more checkboxes than available colors
    const checkboxColor = themedColors[colorIndex];
    const showFilled = !!(rest.checked || rest.indeterminate);

    return (
      <Checkbox
        {...rest}
        animate={false}
        className={getLegendCheckboxStyles({
          className,
          checkboxColor,
          showFilled,
          theme,
        })}
        ref={fwdRef}
      />
    );
  },
);

LegendCheckbox.displayName = 'LegendCheckbox';
