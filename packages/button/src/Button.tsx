import React, { useRef, useEffect } from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { registerRipple } from '@leafygreen-ui/ripple';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { Variant, Size, ButtonProps } from './types';
import { getClassName, getIconStyle } from './styles';

const containerChildStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  pointer-events: none;
`;

const iconSpacing = {
  [Size.XSmall]: 6,
  [Size.Small]: 6,
  [Size.Default]: spacing[2],
  [Size.Large]: spacing[2],
}

const Button: ExtendableBox<
  ButtonProps & { ref?: React.Ref<any> },
  'button'
> = React.forwardRef(function Button(
  {
    variant = Variant.Default,
    size = Size.Default,
    darkMode = false,
    baseFontSize = 14,
    disabled = false,
    leftGlyph,
    rightGlyph,
    children,
    className,
    ...rest
  }: ButtonProps,
  forwardRef,
) {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const localRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  const ref = (node: HTMLAnchorElement | HTMLButtonElement) => {
    localRef.current = node;

    if (typeof forwardRef === 'function') {
      forwardRef(node);
    } else if (forwardRef) {
      (forwardRef as React.MutableRefObject<
        HTMLButtonElement | HTMLAnchorElement
      >).current = node;
    }
  };

  useEffect(() => {
    if (localRef.current != null) {
      registerRipple(localRef.current, { variant, darkMode });
    }
  }, [localRef, variant, darkMode]);

  const isIconOnlyButton = ((leftGlyph || rightGlyph) && !children) ?? false;

  const buttonClassName = getClassName({
    variant,
    size,
    darkMode,
    baseFontSize,
    disabled,
    showFocus,
  });

  const sharedProps = {
    className: cx(buttonClassName, className),
    // only add a disabled prop if not an anchor
    ...(typeof rest.href !== 'string' && { disabled }),
    'aria-disabled': disabled,
    ...rest,
  };

  const accessibleIconProps = !isIconOnlyButton && {
    'aria-hidden': true,
    role: 'presentation',
  };

  const clonedLeftGlyph =
    leftGlyph &&
    React.cloneElement(leftGlyph, {
      className: cx(
        {
          [css`margin-right: ${iconSpacing[size]}px;`]: !isIconOnlyButton || !!rightGlyph,
        },
        getIconStyle({ variant, size, darkMode, disabled, isIconOnlyButton }),
      ),
      ...accessibleIconProps,
    });

  const clonedRightGlyph =
    rightGlyph &&
    React.cloneElement(rightGlyph, {
      className: cx(
        {
          [css`margin-left: ${iconSpacing[size]}px;`]: !isIconOnlyButton || !!leftGlyph,
        },
        getIconStyle({ variant, size, darkMode, disabled, isIconOnlyButton }),
      ),
      ...accessibleIconProps,
    });

  const content = (
    <div className={cx(containerChildStyles, { [css`margin-top: 1px`]: baseFontSize === 14 && size === Size.Small })}>
      {clonedLeftGlyph}
      {children}
      {clonedRightGlyph}
    </div>
  );

  if (typeof rest.href === 'string') {
    return (
      <Box
        as="a"
        ref={ref as (node: HTMLAnchorElement) => void}
        {...sharedProps}
      >
        {content}
      </Box>
    );
  }

  return (
    <Box
      as="button"
      type="button"
      ref={ref as (node: HTMLButtonElement) => void}
      {...sharedProps}
    >
      {content}
    </Box>
  );
});

Button.displayName = 'Button';

export default Button;
