import React from 'react';

import { validateAriaLabelProps } from '@leafygreen-ui/a11y';
import { cx } from '@leafygreen-ui/emotion';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import {
  activeStyle,
  baseIconButtonStyle,
  disabledStyle,
  focusStyle,
  iconButtonMode,
  iconButtonSizes,
  iconStyle,
  removeButtonStyle,
} from './IconButton.styles';
import { AccessibleIconButtonProps, IconProps, Size } from './IconButton.types';

/**
 * Icon Buttons are a type of call to action (CTA) the user can click or press. They use icons to indicate the type of action that will occur when the button is pressed.
 */
export const IconButton = InferredPolymorphic<
  AccessibleIconButtonProps,
  'button'
>(
  (
    {
      as,
      size = Size.Default,
      darkMode: darkModeProp,
      disabled = false,
      active = false,
      tabIndex = 0,
      className,
      children,
      ...restProps
    },
    ref,
  ) => {
    const { Component, rest } = useInferredPolymorphic(as, restProps, 'button');

    const { theme } = useDarkMode(darkModeProp);

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
      <Component {...iconButtonProps}>
        <div className={iconStyle}>{processedChildren}</div>
      </Component>
    );
  },
);

IconButton.displayName = 'IconButton';
