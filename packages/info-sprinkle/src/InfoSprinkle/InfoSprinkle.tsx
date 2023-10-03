import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import Tooltip from '@leafygreen-ui/tooltip';

import { useDarkMode } from '../../../leafygreen-provider/src/DarkModeContext';

import { iconBaseStyles, iconThemeStyles } from './InfoSprinkle.styles';
import { InfoSprinkleProps } from './InfoSprinkle.types';

export const InfoSprinkle = React.forwardRef<HTMLDivElement, InfoSprinkleProps>(
  (
    {
      darkMode: darkModeProp,
      tooltip,
      baseFontSize,
      ...rest
    }: InfoSprinkleProps,
    forwardRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    return (
      <Tooltip
        darkMode={darkMode}
        baseFontSize={baseFontSize}
        trigger={
          <span
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            ref={forwardRef}
            className={cx(iconBaseStyles, iconThemeStyles(theme))}
          >
            <Icon glyph="InfoWithCircle" size={baseFontSize} aria-hidden />
          </span>
        }
        {...rest}
      >
        {tooltip}
      </Tooltip>
    );
  },
);

InfoSprinkle.displayName = 'InfoSprinkle';

// Prop types
