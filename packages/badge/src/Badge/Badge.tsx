import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { badgeVariants, baseStyle } from './styles';
import { BadgeProps, Variant } from './types';

/**
 * Badges can be used to highlight information or the status of something.
 */
function Badge({
  children,
  variant = Variant.LightGray,
  className,
  darkMode: darkModeProp,
  ...rest
}: BadgeProps) {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <div
      {...rest}
      className={cx(baseStyle, badgeVariants[theme][variant], className)}
    >
      {children}
    </div>
  );
}

Badge.displayName = 'Badge';

Badge.propTypes = {
  darkMode: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.values(Variant)),
};

export default Badge;
