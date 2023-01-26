import React from 'react';
import PropTypes from 'prop-types';

import { validateAriaLabelProps } from '@leafygreen-ui/a11y';
import Box from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';

import {
  activeStyle,
  baseIconButtonStyle,
  disabledStyle,
  focusStyle,
  iconButtonMode,
  iconButtonSizes,
  iconStyle,
  removeButtonStyle,
} from './styles';
import { AccessibleIconButtonProps, IconProps, Size } from './types';

export const IconButton = React.forwardRef(
  (
    {
      size = Size.Default,
      darkMode: darkModeProp,
      disabled = false,
      active = false,
      tabIndex = 0,
      className,
      children,
      ...rest
    }: AccessibleIconButtonProps,
    ref: React.Ref<any>,
  ) => {
    const { theme } = useDarkMode(darkModeProp);
    const isAnchor: boolean = typeof rest.href === 'string';

    // We do our own proptype validation here to ensure either 'aria-label' or 'aria-labelledby' are passed to the component.
    validateAriaLabelProps(rest, 'IconButton');

    const processedChildren = React.Children.map(children, child => {
      if (!child) {
        return null;
      }

      // Check to see if child is a LeafyGreen Icon or a LeafyGreen Glyph
      // If so, we unset the title and rely on the aria-label prop to give
      // information about the rendered content.
      if (isComponentType(child, 'Icon') || isComponentGlyph(child)) {
        const { size: childSize, title }: IconProps = child.props;

        const newChildProps: Partial<IconProps> = {
          size: childSize || size,
        };

        if (typeof title !== 'string' || title.length === 0) {
          // Unsets the title within an icon since the button itself will have
          // aria-label or aria-labelledby set.
          newChildProps.title = false;
        }

        return React.cloneElement(child, newChildProps);
      }

      return child;
    });

    const iconButtonProps = {
      ...rest,
      ref,
      tabIndex,
      // We don't set the `disabled` prop since we want the button to be focusable
      ['aria-disabled']: disabled,
      // Override any actions if it's disabled
      href: disabled ? undefined : rest.href,
      onClick: disabled ? undefined : rest.onClick,
      className: cx(
        removeButtonStyle,
        baseIconButtonStyle,
        iconButtonSizes[size],
        iconButtonMode[theme],
        focusStyle[theme],
        {
          [activeStyle[theme]]: active && !disabled,
          [disabledStyle[theme]]: disabled,
        },
        className,
      ),
    };

    return (
      <Box as={isAnchor ? 'a' : 'button'} {...iconButtonProps}>
        <div className={iconStyle}>{processedChildren}</div>
      </Box>
    );
  },
);

IconButton.displayName = 'IconButton';

IconButton.propTypes = {
  darkMode: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(Size)),
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  active: PropTypes.bool,
};
