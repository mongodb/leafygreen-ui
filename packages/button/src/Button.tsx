import React from 'react';
import PropTypes from 'prop-types';
import { UrlObject } from 'url';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import {
  useDarkMode,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import { Variant, Size, ButtonProps } from './types';
import { getClassName, ButtonDataProp } from './styles';
import { isUndefined } from 'lodash';
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
      as,
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

    const isAnchor: boolean = (!!rest.href || as === 'a') && !disabled;

    const buttonContent = (
      <ButtonContent
        {...{
          rightGlyph,
          leftGlyph,
          darkMode,
          disabled,
          variant,
          size,
        }}
      >
        {children}
      </ButtonContent>
    );

    const boxProps = {
      type: isAnchor ? undefined : type || 'button',
      className: cx(buttonClassName, className),
      ref: forwardRef,
      'aria-disabled': disabled,
      ...ButtonDataProp.prop,
    } as const;

    const rootProps = {
      ...rest,
      href: disabled ? '' : (rest.href as string | UrlObject),
      onClick: !disabled ? onClick : undefined,
      // only add the disabled prop if this is a button
      ...(!isAnchor && { disabled }),
    } as const;

    const isComponent = !isUndefined(as) && typeof as !== 'string';

    if (isComponent) {
      const AsComponent = as;
      return (
        <AsComponent {...rootProps}>
          <Box as={'a'} {...boxProps}>
            {buttonContent}
          </Box>
        </AsComponent>
      );
    } else {
      return (
        <Box as={isAnchor ? 'a' : 'button'} {...rootProps} {...boxProps}>
          {buttonContent}
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
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  as: PropTypes.any,
  type: PropTypes.string,
};

export default Button;
