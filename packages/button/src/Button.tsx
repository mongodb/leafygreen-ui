import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { Variant, Size, ButtonProps } from './types';
import { getClassName, getIconStyle } from './styles';

const containerChildStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const iconRightMargin = css`
  margin-right: ${spacing[2]}px;
`;

const iconLeftMargin = css`
  margin-left: ${spacing[2]}px;
`;

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
  ref,
) {
  const isIconOnlyButton = ((leftGlyph || rightGlyph) && !children) ?? false;

  const buttonClassName = getClassName({
    variant,
    size,
    darkMode,
    baseFontSize,
    disabled,
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
          [iconRightMargin]: !isIconOnlyButton || !!rightGlyph,
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
          [iconLeftMargin]: !isIconOnlyButton || !!leftGlyph,
        },
        getIconStyle({ variant, size, darkMode, disabled, isIconOnlyButton }),
      ),
      ...accessibleIconProps,
    });

  const content = (
    <div className={containerChildStyles}>
      {clonedLeftGlyph}
      {children}
      {clonedRightGlyph}
    </div>
  );

  if (typeof rest.href === 'string') {
    return (
      <Box
        as="a"
        ref={ref as React.RefObject<HTMLAnchorElement>}
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
      ref={ref as React.RefObject<HTMLButtonElement>}
      {...sharedProps}
    >
      {content}
    </Box>
  );
});

Button.displayName = 'Button';

export default Button;
