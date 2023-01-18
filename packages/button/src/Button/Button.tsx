import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import {
  useDarkMode,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import {
  InferredPolymorphic,
  PolymorphicAs,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { ButtonContent } from '../ButtonContent/ButtonContent';
import { ButtonClassName } from '../styles';
import { ButtonProps, Size, Variant } from '../types';

import { getClassName } from './Button.styles';

/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 */
export const Button = InferredPolymorphic<ButtonProps, 'button'>(
  (
    {
      variant = Variant.Default,
      size = Size.Default,
      darkMode: darkModeProp,
      baseFontSize = BaseFontSize.Body1,
      disabled = false,
      onClick,
      leftGlyph,
      rightGlyph,
      children,
      className,
      type,
      as = 'button' as PolymorphicAs,
      ...rest
    },
    forwardedRef,
  ) => {
    const { Component } = useInferredPolymorphic(as, rest);

    const { usingKeyboard } = useUsingKeyboardContext();
    const { darkMode } = useDarkMode(darkModeProp);

    const buttonStyles = getClassName({
      variant,
      size,
      darkMode,
      baseFontSize,
      disabled,
      usingKeyboard,
    });

    const isAnchor = Component === 'a';

    const buttonProps = {
      type: isAnchor ? undefined : type || 'button',
      className: cx(ButtonClassName, buttonStyles, className),
      ref: forwardedRef,
      ...(!isAnchor && { disabled }),
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
  },
);

Button.displayName = 'Button';

Button.propTypes = {
  variant: PropTypes.oneOf(Object.values(Variant)),
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
  size: PropTypes.oneOf(Object.values(Size)),
  darkMode: PropTypes.bool,
  // disabled: PropTypes.bool,
  leftGlyph: PropTypes.element,
  rightGlyph: PropTypes.element,
  // href: PropTypes.string,
};
