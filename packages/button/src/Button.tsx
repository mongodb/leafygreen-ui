import React, { useRef, useEffect } from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { registerRipple } from '@leafygreen-ui/ripple';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { Variant, Size, ButtonProps } from './types';
import { getClassName, getRippleClassName, getIconStyle } from './styles';

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
  const localRef = useRef<HTMLDivElement | null>(null);

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

  const isAnchor = typeof rest.href === 'string'
  let type;

  // @ts-expect-error rest.as may be defined
  if ((rest.as && rest.as === 'button') || (!isAnchor && !rest.as)) {
    type = 'button'
  }

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
    <div className={getRippleClassName(size)} ref={localRef}>
      <div className={containerChildStyles}>
        {clonedLeftGlyph}
        {children}
        {clonedRightGlyph}
      </div>
    </div>
  );

  return (
    <Box
      // Provide a default value for the as prop
      // If consumping application passes a value for as, it will override the default set here
      as={isAnchor ? 'a' : 'button'}
      ref={forwardRef}
      type={type}
      {...sharedProps}
    >
      {content}
    </Box>
  )


});

Button.displayName = 'Button';

export default Button;
