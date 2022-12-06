import React from 'react';
import PropTypes from 'prop-types';

import Box, { BoxProps } from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import {
  useDarkMode,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { ButtonContent } from './ButtonContent';
import { ButtonClassName,getClassName } from './styles';
import { ButtonProps,Size, Variant } from './types';

/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 */
export const Button = React.forwardRef(function Button(
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
    as,
    type,
    ...rest
  }: BoxProps<'button', ButtonProps>,
  forwardRef,
) {
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

  const isAnchor: boolean = (!!rest.href || as === 'a') && !disabled;

  const buttonProps = {
    type: isAnchor ? undefined : type || 'button',
    className: cx(ButtonClassName, buttonStyles, className),
    ref: forwardRef,
    // Provide a default value for the as prop
    // If consuming application passes a value for as, it will override the default set here
    as: as ? as : ((isAnchor ? 'a' : 'button') as keyof JSX.IntrinsicElements),
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
    <Box {...buttonProps}>
      <ButtonContent {...contentProps}>{children}</ButtonContent>
    </Box>
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
