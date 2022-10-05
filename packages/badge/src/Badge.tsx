import React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { baseStyle, badgeVariants } from './styles';
import { Variant } from './types';

interface BadgeProps extends HTMLElementProps<'div'> {
  /**
   * An additional className to add to the component's classList
   */
  className?: string;

  /**
   * The content to render within the badge
   */
  children?: React.ReactNode;

  /**
   * The Badge's style variant
   *
   * @default 'lightgray'
   */
  variant?: Variant;

  /**
   * Determines whether or not the component will be rendered in dark theme.
   *
   * @default false
   */
  darkMode?: boolean;
}

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
