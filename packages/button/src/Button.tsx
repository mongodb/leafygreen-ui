import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import {
  useDarkMode,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { InferredPolymorphicProps, Polymorphic, PolymorphicAs, useInferredPolymorphic } from '@leafygreen-ui/polymorphic'

import { ButtonContent } from './ButtonContent';
import { ButtonClassName, getClassName } from './styles';
import { ButtonProps, Size, Variant } from './types';

/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 */
export const Button = Polymorphic<InferredPolymorphicProps<ButtonProps>>(function Button(
  {
    variant = Variant.Default,
    size = Size.Default,
    darkMode: darkModeProp,
    baseFontSize = BaseFontSize.Body1,
    disabled = false,
    as = 'button' as PolymorphicAs,
    onClick,
    leftGlyph,
    rightGlyph,
    children,
    className,
    type,
    ...rest
  },
  forwardRef,
) {
  const { usingKeyboard } = useUsingKeyboardContext();
  const { darkMode } = useDarkMode(darkModeProp);
  const { Component } = useInferredPolymorphic(as, rest)

  const buttonStyles = getClassName({
    variant,
    size,
    darkMode,
    baseFontSize,
    disabled,
    usingKeyboard,
  });

  const isAnchor: boolean = (!!rest.href || as === 'a') && !disabled;

  const buttonProps = {
    type: isAnchor ? undefined : type || 'button',
    className: cx(ButtonClassName, buttonStyles, className),
    ref: forwardRef,
    // only add a disabled prop if not an anchor
    ...(typeof rest.href !== 'string' && { disabled }),
    'aria-disabled': disabled,
    onClick: !disabled ? onClick : undefined,
    ...rest,
  } as const;

  const contentProps = {
    rightGlyph,
    leftGlyph,
    darkMode,
    disabled,
    variant,
    size,
  } as const;

  return (
    <Component {...buttonProps}>
      <ButtonContent {...contentProps}>{children}</ButtonContent>
    </Component>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  variant: PropTypes.oneOf(Object.values(Variant)),
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
  size: PropTypes.oneOf(Object.values(Size)),
  darkMode: PropTypes.bool,
  disabled: PropTypes.bool,
  leftGlyph: PropTypes.element,
  rightGlyph: PropTypes.element,
  href: PropTypes.string,
};
