import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { registerRipple } from '@leafygreen-ui/ripple';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { Variant, Size, ButtonProps, Mode } from './types';
import { getClassName, rippleColors, ButtonDataProp } from './styles';
import ButtonIcon from './ButtonIcon';
import { fontFamilies } from '@leafygreen-ui/tokens';

const rippleStyle = css`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 6px;
`;

const containerChildStyles = css`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  pointer-events: none;
  position: relative;
  z-index: 0;
`;

const containerChildSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    padding: 0 8px;
    gap: 6px;
  `,

  [Size.Small]: css`
    padding: 0 12px;
    gap: 6px;
  `,

  [Size.Default]: css`
    padding: 0 12px;
    gap: 6px;
  `,

  [Size.Large]: css`
    padding: 0 16px;
    gap: 8px;
  `,
};

const Button: ExtendableBox<ButtonProps & { ref?: React.Ref<any> }, 'button'> =
  React.forwardRef(function Button(
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
      as,
      type,
      ...rest
    }: ButtonProps,
    forwardRef,
  ) {
    const { usingKeyboard: showFocus } = useUsingKeyboardContext();
    const rippleRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      let unregisterRipple: (() => void) | undefined;
      const backgroundColor =
        rippleColors[darkMode ? Mode.Dark : Mode.Light][variant];

      if (rippleRef.current != null) {
        unregisterRipple = registerRipple(rippleRef.current, {
          backgroundColor,
        });
      }

      return unregisterRipple;
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

    const isAnchor: boolean = (!!rest.href || as === 'a') && !disabled;

    const buttonProps = {
      type: isAnchor ? undefined : type || 'button',
      className: cx(buttonClassName, className),
      ref: forwardRef,
      // Provide a default value for the as prop
      // If consumping application passes a value for as, it will override the default set here
      as: (isAnchor ? 'a' : 'button') as keyof JSX.IntrinsicElements,
      // only add a disabled prop if not an anchor
      ...(typeof rest.href !== 'string' && { disabled }),
      'aria-disabled': disabled,
      ...ButtonDataProp.prop,
      ...rest,
    } as const;

    const iconProps = { variant, size, darkMode, disabled, isIconOnlyButton };

    const content = (
      <>
        {/* Ripple cannot wrap children, otherwise components that rely on children to render dropdowns will not be rendered due to the overflow:hidden rule. */}
        <div
          className={cx(rippleStyle, {
            // TODO: Refresh - remove darkMode logic
            [css`
              border-radius: 3px;
            `]: darkMode,
          })}
          ref={rippleRef}
        />

        <div
          className={cx(containerChildStyles, containerChildSizeStyles[size], {
            // TODO: Refresh - remove darkMode logic
            [css`
              justify-content: space-between;
            `]: !!rightGlyph && darkMode,
            [css`
              font-family: ${fontFamilies.legacy};
            `]: darkMode,
          })}
        >
          {leftGlyph && (
            <ButtonIcon
              glyph={leftGlyph}
              className={css`
                justify-self: right;
              `}
              {...iconProps}
            />
          )}

          {children}

          {rightGlyph && (
            <ButtonIcon
              glyph={rightGlyph}
              className={css`
                justify-self: left;
              `}
              {...iconProps}
            />
          )}
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
