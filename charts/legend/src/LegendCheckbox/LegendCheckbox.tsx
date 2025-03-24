import React, { forwardRef } from 'react';

import Checkbox from '@leafygreen-ui/checkbox';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getLegendCheckboxStyles } from './LegendCheckbox.styles';
import { LegendCheckboxProps } from './LegendCheckbox.types';

export const LegendCheckbox = forwardRef<HTMLInputElement, LegendCheckboxProps>(
  ({ className, color, ...rest }, fwdRef) => {
    const { theme } = useDarkMode();

    const showFilled = !!(rest.checked || rest.indeterminate);

    return (
      <Checkbox
        {...rest}
        animate={false}
        className={getLegendCheckboxStyles({
          className,
          checkboxColor: color,
          showFilled,
          theme,
        })}
        ref={fwdRef}
      />
    );
  },
);

LegendCheckbox.displayName = 'LegendCheckbox';
