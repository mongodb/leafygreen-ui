import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { UrlObject } from 'url';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import {
  useDarkMode,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import { isJSXIntrinsicElement, isAsComponent } from '@leafygreen-ui/lib';
import { Variant, Size, ButtonProps } from './types';
import { getClassName, ButtonDataProp } from './styles';
import { ButtonContent } from './ButtonContent';

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
      as: asProp,
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

    const isAnchor: boolean = (!!rest.href || asProp === 'a') && !disabled;

    const finalAsProp = useMemo(() => {
      if (isJSXIntrinsicElement(asProp)) {
        return asProp;
      } else if (isAsComponent(asProp)) {
        return 'a';
      } else {
        return isAnchor ? 'a' : 'button';
      }
    }, [asProp, isAnchor]);

    const rootProps = {
      ...rest,
      href: disabled ? '' : (rest.href as string | UrlObject),
      onClick: !disabled ? onClick : undefined,
      // only add the disabled prop if this is a button
      ...(typeof rest.href !== 'string' && { disabled }),
    } as const;

    const boxProps = {
      type: isAnchor ? undefined : type || 'button',
      className: cx(buttonClassName, className),
      ref: forwardRef,
      'aria-disabled': disabled,
      as: finalAsProp,
      ...ButtonDataProp.prop,
      // If this is not a Component, then the Box is also the root
      ...(!isAsComponent(asProp) && rootProps),
    } as const;

    const contentProps = {
      rightGlyph,
      leftGlyph,
      darkMode,
      disabled,
      variant,
      size,
    } as const;

    const WrapperComponent = ({ ...props }) =>
      isAsComponent(asProp) ? (
        React.createElement(asProp, { href: props.href, ...props })
      ) : (
        <>{props.children}</>
      );

    return (
      // If WrapperComponent is a Fragment then is ignored, and rootProps gets applied to the Box
      <WrapperComponent {...rootProps}>
        <Box {...boxProps}>
          <ButtonContent {...contentProps}>{children}</ButtonContent>
        </Box>
      </WrapperComponent>
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
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  as: PropTypes.any,
  type: PropTypes.string,
};

export default Button;
