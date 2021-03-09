import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { Size, Variant, Mode, FontSize, ButtonProps } from './types';

const baseButtonStyles = css`
  background-color: transparent;
  border: 0px solid transparent;
  border-radius: 4px;
  margin: 0;
  transition: all 150ms ease-in-out;
  position: relative;
  text-decoration: none;
  display: block;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const colorSet: Record<Mode, Record<Variant, string>> = {
  [Mode.Light]: {
    [Variant.Primary]: css`
      background-color: ${uiColors.green.dark1};
      box-shadow: 0px 2px 3px rgba(19, 170, 82, 0.4);
      color: ${uiColors.white};

      &:hover {
        background-color: ${uiColors.green.dark2};
        box-shadow: 0px 2px 3px rgba(19, 170, 82, 0.4), 0px 0px 0px 3px #c3e7ca;
      }

      &:active {
        background-color: #0ad05b;
        box-shadow: 0px 2px 3px rgba(19, 170, 82, 0.4), 0px 0px 0px 3px #c3e7ca;
      }

      &:focus {
        box-shadow: 0px 4px 4px rgba(0, 124, 173, 0.4),
          0px 0px 0px 3px ${uiColors.focus};
      }
    `,

    [Variant.Info]: css`
      border: 1px solid ${uiColors.green.dark1};
      color: ${uiColors.green.dark2};

      &:hover {
        background-color: rgba(9, 128, 76, 0.04);
        border: 1px solid ${uiColors.green.dark1};
        box-shadow: 0px 0px 0px 4px ${uiColors.green.light2};
      }

      &:active {
        background-color: rgba(9, 128, 76, 0.24);
        border: 1px solid ${uiColors.green.dark1};
        box-shadow: 0px 0px 0px 4px #c3e7ca;
      }

      &:focus {
        background-color: rgba(9, 128, 76, 0.0025);
        border: 1px solid ${uiColors.green.dark1};
        box-shadow: 0px 0px 0px 4px ${uiColors.focus};
      }
    `,

    [Variant.Default]: css`
      background-color: ${uiColors.gray.light3};
      border: 1px solid ${uiColors.gray.base};
      box-shadow: 0px 1px 2px rgba(6, 22, 33, 0.3);
      color: ${uiColors.gray.dark2};

      &:hover {
        background-color: ${uiColors.white};
        border: 1px solid ${uiColors.gray.dark1};
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3),
          0px 0px 0px 3px ${uiColors.gray.light2};
      }

      &:active {
        background-color: ${uiColors.gray.light2};
        border: 1px solid ${uiColors.gray.dark1};
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3),
          0px 0px 0px 3px ${uiColors.gray.light2};
      }

      &:focus {
        background: ${uiColors.gray.light3};
        border: 1px solid ${uiColors.gray.base};
        box-shadow: 0px 4px 4px rgba(0, 124, 173, 0.4),
          0px 0px 0px 3px ${uiColors.focus};
      }
    `,

    [Variant.Danger]: css`
      background-color: ${uiColors.red.base};
      box-shadow: 0px 1px 2px rgba(207, 74, 34, 0.4);
      color: ${uiColors.white};

      &:hover {
        background-color: ${uiColors.red.dark1};
        box-shadow: 0px 4px 4px rgba(207, 74, 34, 0.25),
          0px 0px 0px 3px ${uiColors.red.light2};
      }

      &:active {
        background-color: #f97216;
        box-shadow: 0px 4px 4px rgba(207, 74, 34, 0.25),
          0px 0px 0px 3px ${uiColors.red.light2};
      }

      &:focus {
        background-color: ${uiColors.red.base};
        box-shadow: 0px 4px 4px rgba(0, 124, 173, 0.4),
          0px 0px 0px 3px ${uiColors.focus};
      }
    `,

    [Variant.SecondaryDanger]: css`
      border: 1px solid ${uiColors.red.base};
      color: ${uiColors.red.dark2};

      &:hover {
        background-color: rgba(207, 74, 34, 0.04);
        border: 1px solid ${uiColors.red.base};
        box-shadow: 0px 0px 0px 4px ${uiColors.red.light2};
      }

      &:active {
        background-color: rgba(207, 74, 34, 0.24);
        border: 1px solid ${uiColors.red.base};
        box-shadow: 0px 0px 0px 4px ${uiColors.red.light2};
      }

      &:focus {
        background: rgba(207, 74, 34, 0.0025);
        border: 1px solid ${uiColors.red.dark2};
        box-shadow: 0px 0px 0px 4px #019ee2;
      }
    `,
  },
  [Mode.Dark]: {
    [Variant.Primary]: css`
      background-color: ${uiColors.green.dark2};
      border: 1px solid ${uiColors.green.base};
      color: ${uiColors.white};

      &:hover {
        background-color: ${uiColors.green.dark1};
      }

      &:active {
        background-color: #0ad05b;
      }

      &:focus {
        background: #116149;
        box-shadow: 0px 4px 4px rgba(0, 124, 173, 0.4),
          0px 0px 0px 3px ${uiColors.focus};
      }
    `,

    [Variant.Info]: css`
      border: 1px solid ${uiColors.green.dark1};
      color: #0ad05b;

      &:hover {
        background-color: rgba(10, 208, 91, 0.08);
        box-shadow: inset 0px 0px 0px 1px ${uiColors.green.dark1};
      }

      &:active {
        background: rgba(19, 170, 82, 0.24);
        box-shadow: inset 0px 0px 0px 1px ${uiColors.green.dark1};
      }

      &:focus {
        background: rgba(10, 208, 91, 0.08);
        border: 1px solid ${uiColors.green.dark1};
        box-shadow: 0px 0px 0px 4px #139fd7;
      }
    `,

    [Variant.Default]: css`
      background-color: ${uiColors.gray.dark2};
      border: 1px solid ${uiColors.gray.base};
      color: ${uiColors.white};

      &:hover {
        background-color: ${uiColors.gray.dark1};
        border: 1px solid ${uiColors.gray.base};
      }

      &:active {
        background-color: ${uiColors.gray.base};
      }

      &:focus {
        box-shadow: 0px 0px 0px 3px #2f9fc5;
      }
    `,

    [Variant.Danger]: css`
      background-color: ${uiColors.red.dark1};
      border: 1px solid #f97216;
      color: ${uiColors.white};

      &:hover {
        background-color: ${uiColors.red.base};
        border: 1px solid #f97216;
      }

      &:active {
        background: #f97216;
        border: 1px solid #f97216;
      }

      &:focus {
        background: #cf4a22;
        box-shadow: 0px 0px 0px 3px ${uiColors.focus};
      }
    `,

    [Variant.SecondaryDanger]: css`
      border: 1px solid #f97216;
      color: #f97216;

      &:hover {
        background: rgba(249, 114, 22, 0.08);
        box-shadow: inset 0px 0px 0px 1px #f97216;
      }

      &:active {
        background: rgba(249, 114, 22, 0.24);
        box-shadow: inset 0px 0px 0px 1px #f97216;
      }

      &:focus {
        background: rgba(249, 114, 22, 0.08);
        border: 1px solid #f97216;
        box-shadow: 0px 0px 0px 4px #019ee2;
      }
    `,
  },
};

const disabledStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    background-color: ${uiColors.gray.light2};
    border: 1px solid ${uiColors.gray.light2};
    box-shadow: 0px 0px 0px 1px ${uiColors.gray.light1};
    pointer-events: none;
    cursor: not-allowed;
    color: ${uiColors.gray.dark1};
  `,

  [Mode.Dark]: css`
    background: rgba(61, 79, 88, 0.3);
    border: 1px solid ${uiColors.gray.dark2};
    color: ${uiColors.gray.base};
    pointer-events: none;
    cursor: not-allowed;
  `,
};

const sizeSet: Record<Size, string> = {
  [Size.XSmall]: css`
    height: 22px;
    padding: 3px ${spacing[2]}px;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 16px;
    font-weight: bold;
    letter-spacing: 0.4px;
  `,

  [Size.Small]: css`
    height: 28px;
    padding: ${spacing[1]}px 12px 5px;
  `,

  [Size.Default]: css`
    height: 36px;
    padding: ${spacing[2]}px 12px 9px;
  `,

  [Size.Large]: css`
    height: 48px;
    padding: 14px ${spacing[3]}px;
    font-size: 18px;
    line-height: 20px;
  `,
};

const fontStyles: Record<FontSize, string> = {
  [14]: css`
    font-size: 14px;
    line-height: 20px;
  `,
  [16]: css`
    font-size: 16px;
    line-height: 24px;
  `,
};

export function getClassName({
  variant,
  size: sizeProp,
  darkMode,
  baseFontSize,
  disabled,
}: Required<
  Pick<
    ButtonProps,
    'baseFontSize' | 'variant' | 'size' | 'darkMode' | 'disabled'
  >
>) {
  const mode = darkMode ? Mode.Dark : Mode.Light;
  const color = colorSet[mode][variant];
  const size = sizeSet[sizeProp];
  const fontSize = fontStyles[baseFontSize];

  return cx(
    baseButtonStyles,
    color,
    { [disabledStyle[mode]]: disabled },
    fontSize,
    size,
  );
}

const iconColor: Record<Mode, Record<Variant, string>> = {
  [Mode.Light]: {
    [Variant.Primary]: css`
      color: ${uiColors.green.light3};
    `,
    [Variant.Info]: css`
      color: ${uiColors.green.dark1};
    `,
    [Variant.Default]: css`
      color: ${uiColors.gray.dark1};
    `,
    [Variant.Danger]: css`
      color: ${uiColors.red.light3};
    `,
    [Variant.SecondaryDanger]: css`
      color: ${uiColors.red.base};
    `,
  },

  [Mode.Dark]: {
    [Variant.Primary]: css`
      color: ${uiColors.green.light2};
    `,
    [Variant.Info]: css`
      color: #13aa52;
    `,
    [Variant.Default]: css`
      color: ${uiColors.gray.light1};
    `,
    [Variant.Danger]: css`
      color: ${uiColors.red.light3};
    `,
    [Variant.SecondaryDanger]: css`
      color: #f97216;
    `,
  },
};

const onlyIconColor: Record<Mode, Record<Variant, string>> = {
  [Mode.Light]: {
    [Variant.Primary]: css`
      color: ${uiColors.white};
    `,
    [Variant.Info]: css`
      color: ${uiColors.green.dark1};
    `,
    [Variant.Default]: css`
      color: ${uiColors.gray.dark2};
    `,
    [Variant.Danger]: css`
      color: ${uiColors.white};
    `,
    [Variant.SecondaryDanger]: css`
      color: #cf4a22;
    `,
  },
  [Mode.Dark]: {
    [Variant.Primary]: css`
      color: ${uiColors.white};
    `,
    [Variant.Info]: css`
      color: #0ad05b;
    `,
    [Variant.Default]: css`
      color: ${uiColors.white};
    `,
    [Variant.Danger]: css`
      color: ${uiColors.white};
    `,
    [Variant.SecondaryDanger]: css`
      color: #f97216;
    `,
  },
};

const iconSize: Record<Size, string> = {
  [Size.XSmall]: css`
    height: 12.25px;
    width: 12.25px;
  `,
  [Size.Small]: css`
    height: 14px;
    width: 14px;
  `,
  [Size.Default]: css`
    height: 14px;
    width: 14px;
  `,
  [Size.Large]: css`
    height: 17.5px;
    width: 17.5px;
  `,
};

const disabledIconStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${uiColors.gray.light1};
  `,
  [Mode.Dark]: css`
    color: ${uiColors.gray.dark1};
  `,
};

type IconStyle = Required<
  Pick<ButtonProps, 'variant' | 'size' | 'darkMode' | 'disabled'>
> & {
  isIconOnlyButton: boolean;
};

export function getIconStyle({
  variant,
  size: sizeProp,
  darkMode,
  disabled,
  isIconOnlyButton,
}: IconStyle) {
  const mode = darkMode ? Mode.Dark : Mode.Light;
  const color = isIconOnlyButton
    ? onlyIconColor[mode][variant]
    : iconColor[mode][variant];
  const size = iconSize[sizeProp];

  return cx(color, { [disabledIconStyle[mode]]: disabled }, size);
}
