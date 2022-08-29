import React from 'react';
import PropTypes from 'prop-types';
import Box from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import {
  useDarkMode,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import {
  Variant,
  Size,
  ButtonProps,
  isJSXIntrinsicElement,
  isReactComponent,
} from './types';
import { getClassName, ButtonDataProp } from './styles';
import { ButtonContent } from './ButtonContent';

/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 */
const Button = React.forwardRef(function Button(
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
    as: AsProp,
    type,
    ...rest
  }: ButtonProps,
  forwardRef,
) {
  const { usingKeyboard } = useUsingKeyboardContext();

  const { darkMode } = useDarkMode(darkModeProp);

  const buttonClassName = getClassName({
    variant,
    size,
    darkMode,
    baseFontSize,
    disabled,
    usingKeyboard,
  });

  const isAnchor: boolean = (!!rest.href || AsProp === 'a') && !disabled;

  // What will the final element be rendered as?
  const getBoxAsPropProp = (): keyof JSX.IntrinsicElements => {
    if (isJSXIntrinsicElement(AsProp)) {
      return AsProp;
    } else if (isReactComponent(AsProp)) {
      // If we pass in a component (like NextJS link) then it will finally be rendered as an anchor
      return 'a' as keyof JSX.IntrinsicElements;
    } else {
      return (isAnchor ? 'a' : 'button') as keyof JSX.IntrinsicElements;
    }
  };

  // Props to add to the component root, whether that's the `AsPropComponent`, or `Box`
  const rootProps = {
    href: disabled ? '' : (rest.href as string),
    onClick: !disabled ? onClick : undefined,
    // only add the disabled prop if this is a button
    ...(typeof rest.href !== 'string' && { disabled }),
  } as const;

  // Props to add to the Box
  const boxProps = {
    ...rest,
    type: isAnchor ? undefined : type || 'button',
    className: cx(buttonClassName, className),
    ref: forwardRef,
    'aria-disabled': disabled,
    as: getBoxAsPropProp(),
    ...ButtonDataProp.prop,
    ...(!isReactComponent(AsProp) && rootProps),
  } as React.ComponentPropsWithRef<'button'> & {
    as: keyof JSX.IntrinsicElements;
  };

  const contentProps = {
    rightGlyph,
    leftGlyph,
    darkMode,
    disabled,
    variant,
    size,
  } as const;

  if (isReactComponent(AsProp)) {
    return (
      <AsProp {...rootProps}>
        <Box {...boxProps}>
          <ButtonContent {...contentProps}>{children}</ButtonContent>
        </Box>
      </AsProp>
    );
  } else {
    return (
      <Box {...boxProps}>
        <ButtonContent {...contentProps}>{children}</ButtonContent>
      </Box>
    );
  }
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
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  as: PropTypes.any,
  type: PropTypes.string,
};

export default Button;
