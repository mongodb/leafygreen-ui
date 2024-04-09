import React from 'react';
import PropTypes from 'prop-types';

import Box, { BoxProps } from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { ButtonContent } from '../ButtonContent/ButtonContent';
import { LGIDS_BUTTON } from '../constants';
import { ButtonClassName } from '../styles';
import { ButtonProps, Size, Variant } from '../types';

import { getClassName } from './Button.styles';

/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 */
export const Button = React.forwardRef(function Button(
  {
    variant = Variant.Default,
    size = Size.Default,
    darkMode: darkModeProp,
    'data-lgid': dataLgId = LGIDS_BUTTON.root,
    baseFontSize = BaseFontSize.Body1,
    disabled = false,
    onClick,
    leftGlyph,
    rightGlyph,
    children,
    className,
    as,
    type,
    isLoading = false,
    loadingIndicator,
    loadingText,
    ...rest
  }: BoxProps<'button', ButtonProps>,
  forwardRef,
) {
  const { darkMode } = useDarkMode(darkModeProp);

  const isAnchor: boolean = (!!rest.href || as === 'a') && !disabled;
  const isInteractive = !(disabled || isLoading);

  const buttonStyles = getClassName({
    variant,
    size,
    darkMode,
    baseFontSize,
    disabled: !isInteractive,
  });

  const buttonProps = {
    'data-lgid': dataLgId,
    type: isAnchor ? undefined : type || 'button',
    className: cx(ButtonClassName, buttonStyles, className),
    ref: forwardRef,
    // Provide a default value for the as prop
    // If consuming application passes a value for as, it will override the default set here
    as: as ? as : ((isAnchor ? 'a' : 'button') as keyof JSX.IntrinsicElements),
    'aria-disabled': !isInteractive,
    onClick: isInteractive
      ? onClick
      : (e: React.MouseEvent) => e.preventDefault(),
    href: isInteractive ? rest.href : undefined,
    ...rest,
  } as const;

  const contentProps = {
    rightGlyph,
    leftGlyph,
    darkMode,
    disabled,
    variant,
    size,
    isLoading,
    loadingIndicator,
    loadingText,
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
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  loadingIndicator: PropTypes.element,
};
