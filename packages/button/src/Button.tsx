import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { registerRipple } from '@leafygreen-ui/ripple';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { Variant, Size, ButtonProps, Mode } from './types';
import { getClassName, colorMap } from './styles';
import ButtonIcon from './ButtonIcon';

const rippleStyle = css`
  overflow: hidden;
  /* border-radius: 3px; */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const containerChildStyles = css`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  pointer-events: none;
  position: relative;
  z-index: 0;
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
    padding-left: ${spacing[3]}px;
    padding-right: ${spacing[3]}px;
  `,
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
    let unregisterRipple: (() => void) | undefined;
    const backgroundColor =
      colorMap[darkMode ? Mode.Dark : Mode.Light][variant];

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

  const isAnchor = typeof rest.href === 'string';
  let type: JSX.IntrinsicElements['button']['type'];

  // Expecting this error based on typing in Box component
  // @ts-expect-error rest.as may be defined
  if ((rest.as && rest.as === 'button') || (!isAnchor && !rest.as)) {
    type = 'button';
  }

  // Render a disabled link as a button to retain focusability
  const getButtonTag = (
    isAnchor: boolean,
    disabled: boolean,
  ): 'a' | 'button' => {
    if (isAnchor && !disabled) return 'a';
    return 'button';
  };

  const buttonProps = {
    type,
    className: cx(buttonClassName, className),
    ref: forwardRef,
    // Provide a default value for the as prop
    // If consumping application passes a value for as, it will override the default set here
    as: getButtonTag(isAnchor, disabled),
    // only add a disabled prop if not an anchor
    ...(typeof rest.href !== 'string' && { disabled }),
    'aria-disabled': disabled,
    ...rest,
  } as const;

  const iconProps = { variant, size, darkMode, disabled, isIconOnlyButton };

  const iconSpacing = size === Size.Large ? '8px' : '6px';

  const content = (
    <>
      {/* Ripple cannot wrap children, otherwise components that rely on children to render dropdowns will not be rendered due to the overflow:hidden rule. */}
      <div
        className={cx(
          rippleStyle,
          css`
            // TODO: Refresh - remove darkMode logic
            border-radius: ${darkMode ? 3 : 6}px;
          `,
        )}
        ref={rippleRef}
      />

      <div
        className={cx(
          containerChildStyles,
          {
            [css`
              justify-content: space-between;
            `]: !!rightGlyph,
            [css`
              justify-content: center;
            `]: !rightGlyph,
          },
          padding[size],
        )}
      >
        {leftGlyph && (
          <ButtonIcon
            glyph={leftGlyph}
            className={cx(
              { [css`margin-right: ${iconSpacing};}`]: !isIconOnlyButton },
              css`
                vertical-align: text-top;
              `,
            )}
            {...iconProps}
          />
        )}

        {children}

        {rightGlyph && (
          <span
            className={css`
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: auto;
            `}
          >
            <ButtonIcon
              glyph={rightGlyph}
              className={
                !isIconOnlyButton ? css`margin-left: ${iconSpacing};}` : ''
              }
              {...iconProps}
            />
          </span>
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
