import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import Tooltip from '@leafygreen-ui/tooltip';

import { useDarkMode } from '../../../leafygreen-provider/src/DarkModeContext';

import { iconBaseStyles, iconThemeStyles } from './InfoSprinkle.styles';
import { Align, InfoSprinkleProps, Justify } from './InfoSprinkle.types';

export const InfoSprinkle = React.forwardRef<HTMLDivElement, InfoSprinkleProps>(
  (
    { darkMode: darkModeProp, info, baseFontSize, ...rest }: InfoSprinkleProps,
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
            data-testid="info-sprinkle-icon"
          >
            <Icon glyph="InfoWithCircle" size={baseFontSize} aria-hidden />
          </span>
        }
        {...rest}
      >
        {info}
      </Tooltip>
    );
  },
);

InfoSprinkle.displayName = 'InfoSprinkle';

InfoSprinkle.propTypes = {
  info: PropTypes.string.isRequired,
  className: PropTypes.string,
  align: PropTypes.oneOf(Object.values(Align)),
  justify: PropTypes.oneOf(Object.values(Justify)),
  darkMode: PropTypes.bool,
  enabled: PropTypes.bool,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  id: PropTypes.string,
  shouldClose: PropTypes.func,
  usePortal: PropTypes.bool,
  portalClassName: PropTypes.string,
};
