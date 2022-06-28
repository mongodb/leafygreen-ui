import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { registerRipple } from '@leafygreen-ui/ripple';
import {
  useDarkMode,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import { Variant, Size, ButtonProps } from './types';
import {
  getClassName,
  rippleColors,
  ButtonDataProp,
  rippleStyle,
  buttonContentStyle,
  buttonContentSizeStyle,
} from './styles';
import ButtonIcon from './ButtonIcon';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { getTheme } from '@leafygreen-ui/lib';

/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 */
const Button: ExtendableBox<ButtonProps & { ref?: React.Ref<any> }, 'button'> =
  React.forwardRef(function Button(
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
    }: ButtonProps,
    forwardRef,
  ) {
    const { usingKeyboard } = useUsingKeyboardContext();
    const rippleRef = useRef<HTMLDivElement | null>(null);

    const { darkMode } = useDarkMode(darkModeProp);

    useEffect(() => {
      let unregisterRipple: (() => void) | undefined;
      const backgroundColor = rippleColors[getTheme(darkMode)][variant];

      if (rippleRef.current != null && !disabled) {
        unregisterRipple = registerRipple(rippleRef.current, {
          backgroundColor,
        });
      }

      return unregisterRipple;
    }, [rippleRef, variant, darkMode, disabled]);

    const isIconOnlyButton = ((leftGlyph || rightGlyph) && !children) ?? false;

    const buttonClassName = getClassName({
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
      className: cx(buttonClassName, className),
      ref: forwardRef,
      // Provide a default value for the as prop
      // If consuming application passes a value for as, it will override the default set here
      as: as
        ? as
        : ((isAnchor ? 'a' : 'button') as keyof JSX.IntrinsicElements),
      // only add a disabled prop if not an anchor
      ...(typeof rest.href !== 'string' && { disabled }),
      'aria-disabled': disabled,
      onClick: !disabled ? onClick : undefined,
      ...ButtonDataProp.prop,
      ...rest,
    } as const;

    const iconProps = { variant, size, darkMode, disabled, isIconOnlyButton };

    const content = (
      <>
        {/* Ripple cannot wrap children, otherwise components that rely on children to render dropdowns will not be rendered due to the overflow:hidden rule. */}
        <div className={cx(rippleStyle)} ref={rippleRef} />

        <div
          className={cx(buttonContentStyle, buttonContentSizeStyle[size], {
            [css`
              justify-content: space-between;
            `]: !!rightGlyph && darkMode,
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
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
  size: PropTypes.oneOf(Object.values(Size)),
  darkMode: PropTypes.bool,
  disabled: PropTypes.bool,
  leftGlyph: PropTypes.element,
  rightGlyph: PropTypes.element,
  href: PropTypes.string,
};

export default Button;
