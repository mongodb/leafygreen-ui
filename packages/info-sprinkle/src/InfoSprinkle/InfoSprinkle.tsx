import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import Tooltip, { RenderMode } from '@leafygreen-ui/tooltip';

import { iconBaseStyles, iconThemeStyles } from './InfoSprinkle.styles';
import { Align, InfoSprinkleProps, Justify } from './InfoSprinkle.types';

export const InfoSprinkle = React.forwardRef<
  HTMLButtonElement,
  InfoSprinkleProps
>(
  (
    {
      darkMode: darkModeProp,
      children,
      baseFontSize,
      triggerProps = {},
      ...rest
    }: InfoSprinkleProps,
    forwardRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    return (
      <Tooltip
        baseFontSize={baseFontSize}
        darkMode={darkMode}
        renderMode={RenderMode.TopLayer}
        trigger={
          <button
            data-testid="info-sprinkle-icon"
            aria-label="more info"
            {...triggerProps}
            aria-disabled
            ref={forwardRef}
            className={cx(
              iconBaseStyles,
              iconThemeStyles(theme),
              triggerProps?.className,
            )}
          >
            <InfoWithCircleIcon size={baseFontSize} aria-hidden />
          </button>
        }
        {...rest}
      >
        {children}
      </Tooltip>
    );
  },
);

InfoSprinkle.displayName = 'InfoSprinkle';

InfoSprinkle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  align: PropTypes.oneOf(Object.values(Align)),
  justify: PropTypes.oneOf(Object.values(Justify)),
  darkMode: PropTypes.bool,
  enabled: PropTypes.bool,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  id: PropTypes.string,
  shouldClose: PropTypes.func,
};
