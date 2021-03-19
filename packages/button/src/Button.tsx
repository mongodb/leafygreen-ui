import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing, fontFamilies } from '@leafygreen-ui/tokens';
import { registerRipple } from '@leafygreen-ui/ripple';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { Variant, Size, ButtonProps } from './types';
import { getClassName, getIconStyle } from './styles';

const rippleStyle = css`
  overflow: hidden;
  border-radius: 3px;
  flex-grow: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const containerChildStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  pointer-events: none;
  z-index: 0;
  font-family: ${fontFamilies.default};
`;

const padding: Record<Size, string> = {
  [Size.XSmall]: css`
    padding-left: 6px;
    padding-right: 6px;
  `,

  [Size.Small]: css`
    padding-left: 12px;
    padding-right: 12px;
  `,

  [Size.Default]: css`
    padding-left: 12px;
    padding-right: 12px;
  `,

  [Size.Large]: css`
    padding-left: 16px;
    padding-right: 16px;
  `,
};

const iconSpacing = {
  [Size.XSmall]: 6,
  [Size.Small]: 6,
  [Size.Default]: 6,
  [Size.Large]: spacing[2],
};

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
  const rippleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (rippleRef.current != null) {
      registerRipple(rippleRef.current, { variant, darkMode });
    }
  }, [rippleRef, variant, darkMode]);

  const isIconOnlyButton = ((leftGlyph || rightGlyph) && !children) ?? false;

  const buttonClassName = getClassName({
    variant,
    size,
    darkMode,
    baseFontSize,
    disabled,
    showFocus,
  });

  const isAnchor = typeof rest.href === 'string';
  let type: JSX.IntrinsicElements['button']['type'];

  // @ts-expect-error rest.as may be defined
  if ((rest.as && rest.as === 'button') || (!isAnchor && !rest.as)) {
    type = 'button';
  }

  const buttonProps = {
    type,
    className: cx(buttonClassName, className),
    ref: forwardRef,
    // Provide a default value for the as prop
    // If consumping application passes a value for as, it will override the default set here
    as: isAnchor ? 'a' : 'button',
    // only add a disabled prop if not an anchor
    ...(typeof rest.href !== 'string' && { disabled }),
    'aria-disabled': disabled,
    ...rest,
  } as const;

  const accessibleIconProps = !isIconOnlyButton && {
    'aria-hidden': true,
    role: 'presentation',
  };

  const clonedLeftGlyph =
    leftGlyph &&
    React.cloneElement(leftGlyph, {
      className: cx(
        {
          [css`
            margin-right: ${iconSpacing[size]}px;
          `]: !isIconOnlyButton || !!rightGlyph,
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
          [css`
            margin-left: ${iconSpacing[size]}px;
          `]: !isIconOnlyButton || !!leftGlyph,
        },
        getIconStyle({ variant, size, darkMode, disabled, isIconOnlyButton }),
      ),
      ...accessibleIconProps,
    });

  const content = (
    <>
      {/* Ripple cannot wrap children, otherwise components that rely on children to render dropdowns will not be rendered due to the overflow:hidden rule. */}
      <div className={rippleStyle} ref={rippleRef} />
      <div className={cx(containerChildStyles, padding[size])}>
        {clonedLeftGlyph}
        {children}
        {clonedRightGlyph}
      </div>
    </>
  );

  return <Box {...buttonProps}>{content}</Box>;
});

Button.displayName = 'Button';

Button.propTypes = {
  variant: PropTypes.oneOf(Object.values(Variant)),
  darkMode: PropTypes.bool,
  baseFontSize: PropTypes.oneOf([14, 16]),
  size: PropTypes.oneOf(Object.values(Size)),
  disabled: PropTypes.bool,
  leftGlyph: PropTypes.element,
  rightGlyph: PropTypes.element,
  href: PropTypes.string,
};

export default Button;
