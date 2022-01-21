import React from 'react';
import { uiColors, palette } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { ButtonProps, Variant, Size, Mode } from './types';

const iconColor: Record<Mode, Record<Variant, string>> = {
  [Mode.Light]: {
    [Variant.Default]: css`
      color: ${palette.gray.base};
    `,
    [Variant.Primary]: css`
      color: ${palette.green.light2};
    `,
    [Variant.PrimaryOutline]: css`
      color: ${palette.green.dark2};
    `,
    [Variant.Danger]: css`
      color: ${palette.red.light3};
    `,
    [Variant.DangerOutline]: css`
      color: ${palette.red.light1};
    `,
    [Variant.BaseGreen]: css`
      color: ${palette.green.dark2};
    `,
  },

  [Mode.Dark]: {
    [Variant.Primary]: css`
      color: ${uiColors.green.light2};
    `,
    [Variant.PrimaryOutline]: css`
      color: #13aa52;
    `,
    [Variant.Default]: css`
      color: ${uiColors.gray.light1};
    `,
    [Variant.Danger]: css`
      color: ${uiColors.red.light3};
    `,
    [Variant.DangerOutline]: css`
      color: #f97216;
    `,
    [Variant.BaseGreen]: css`
      color: ${uiColors.gray.light1};
    `,
  },
};

const onlyIconColor: Record<Mode, Record<Variant, string>> = {
  [Mode.Light]: {
    [Variant.Default]: css`
      color: ${palette.gray.dark1};
    `,
    [Variant.Primary]: css`
      color: ${palette.green.light3};
    `,
    [Variant.PrimaryOutline]: css`
      color: ${palette.green.dark2};
    `,
    [Variant.Danger]: css`
      color: ${palette.red.light3};
    `,
    [Variant.DangerOutline]: css`
      color: ${palette.red.light1};
    `,
    [Variant.BaseGreen]: css`
      color: ${palette.green.dark2};
    `,
  },
  [Mode.Dark]: {
    [Variant.Primary]: css`
      color: ${uiColors.white};
    `,
    [Variant.PrimaryOutline]: css`
      color: #0ad05b;
    `,
    [Variant.Default]: css`
      color: ${uiColors.white};
    `,
    [Variant.Danger]: css`
      color: ${uiColors.white};
    `,
    [Variant.DangerOutline]: css`
      color: #f97216;
    `,
    [Variant.BaseGreen]: css`
      color: ${uiColors.gray.light1};
    `,
  },
};

const iconSize: Record<Size, string> = {
  [Size.XSmall]: css`
    height: 14px;
    width: 14px;
  `,
  [Size.Small]: css`
    height: 16px;
    width: 16px;
  `,
  [Size.Default]: css`
    height: 16px;
    width: 16px;
  `,
  [Size.Large]: css`
    height: 20px;
    width: 20px;
  `,
};

const disabledIconStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.gray.light2};
  `,
  [Mode.Dark]: css`
    color: ${uiColors.gray.dark1};
  `,
};

function ButtonIcon({
  glyph,
  variant,
  size,
  darkMode,
  disabled,
  isIconOnlyButton,
  className,
}: Required<
  Pick<ButtonProps, 'variant' | 'size' | 'darkMode' | 'disabled' | 'className'>
> & {
  isIconOnlyButton: boolean;
  glyph: React.ReactElement;
}) {
  const accessibleIconProps = !isIconOnlyButton && {
    'aria-hidden': true,
    role: 'presentation',
  };

  const mode = darkMode ? Mode.Dark : Mode.Light;
  const color = isIconOnlyButton
    ? onlyIconColor[mode][variant]
    : iconColor[mode][variant];

  return React.cloneElement(glyph, {
    className: cx(
      color,
      { [disabledIconStyle[mode]]: disabled },
      iconSize[size],
      className,
    ),
    ...accessibleIconProps,
  });
}

ButtonIcon.displayName = 'ButtonIcon';

export default ButtonIcon;
