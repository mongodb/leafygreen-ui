import { transparentize } from 'polished';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette, uiColors } from '@leafygreen-ui/palette';
import { Size, Variant, Mode, ButtonProps } from './types';
import { fontFamilies } from '@leafygreen-ui/tokens';

const focusBoxShadow = (color: string) => `
    0 0 0 3px ${color}, 
    0 0 0 5px ${palette.blue.light1};
`;

const baseButtonStyles = css`
  // unset browser default
  appearance: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: 0px solid transparent;
  display: inline-flex;
  align-items: stretch;
  transition: all 150ms ease-in-out;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;

  &:focus {
    outline: none;
  }

  &:disabled {
    pointer-events: none;
  }

  &:active,
  &:focus,
  &:hover {
    text-decoration: none;
  }
`;

const colorSet: Record<Mode, Record<Variant, string>> = {
  [Mode.Light]: {
    [Variant.Default]: css`
      background-color: ${palette.gray.light3};
      border: 1px solid ${palette.gray.base};
      color: ${palette.gray.dark3};

      &:hover,
      &:active {
        background-color: ${palette.white};
        box-shadow: 0 0 0 3px ${palette.gray.light2};
      }
    `,

    [Variant.Primary]: css`
      background-color: ${palette.green.dark2};
      color: ${palette.white};

      &:hover,
      &:active {
        color: ${palette.white};
        background-color: #00593f; // Not quite dark3
        box-shadow: 0 0 0 3px ${palette.green.light2};
      }
    `,

    [Variant.PrimaryOutline]: css`
      border: 1px solid ${palette.green.dark2};
      color: ${palette.green.dark2};

      &:hover,
      &:active {
        background-color: ${transparentize(0.96, palette.green.base)};
        box-shadow: 0px 0px 0px 3px ${palette.green.light2};
      }
    `,

    [Variant.Danger]: css`
      background-color: ${palette.red.base};
      color: ${palette.white};

      &:hover,
      &:active {
        color: ${palette.white};
        background-color: #c82222; // not quite dark1
        box-shadow: 0px 0px 0px 3px ${palette.red.light3};
      }
    `,

    [Variant.DangerOutline]: css`
      border: 1px solid ${palette.red.light1};
      color: ${palette.red.base};

      &:hover,
      &:active {
        color: ${palette.red.dark2};
        background-color: ${transparentize(0.96, palette.red.base)};
        border: 1px solid ${palette.red.base};
        box-shadow: 0px 0px 0px 3px ${uiColors.red.light3};
      }
    `,

    [Variant.BaseGreen]: css`
      border: 1px solid ${palette.green.dark2};
      color: ${palette.green.dark3};
      background-color: ${palette.green.base};

      &:hover,
      &:active {
        box-shadow: 0px 0px 0px 3px ${palette.green.light2};
      }
    `,
  },
  [Mode.Dark]: {
    [Variant.Primary]: css`
      background-color: ${uiColors.green.dark2};
      border: 1px solid ${uiColors.green.base};
      color: ${uiColors.white};

      &:focus {
        color: ${uiColors.white};
      }

      &:hover,
      &:active {
        color: ${uiColors.white};
        background-color: ${uiColors.green.dark1};
        box-shadow: 0px 0px 0px 3px ${uiColors.green.dark2};
      }
    `,

    [Variant.PrimaryOutline]: css`
      border: 1px solid ${uiColors.green.base};
      color: #0ad05b;

      &:focus {
        color: #0ad05b;
      }

      &:hover,
      &:active {
        color: #0ad05b;
        background-color: rgba(10, 208, 91, 0.08);
        border: 1px solid ${uiColors.green.base};
        box-shadow: 0px 0px 0px 3px ${uiColors.green.dark2};
      }
    `,

    [Variant.Default]: css`
      background-color: ${uiColors.gray.dark2};
      border: 1px solid ${uiColors.gray.base};
      color: ${uiColors.white};

      &:focus {
        color: ${uiColors.white};
      }

      &:hover,
      &:active {
        color: ${uiColors.white};
        background-color: ${uiColors.gray.dark1};
        border: 1px solid ${uiColors.gray.base};
        box-shadow: 0px 0px 0px 3px ${uiColors.gray.dark2};
      }
    `,

    [Variant.Danger]: css`
      background-color: ${uiColors.red.dark1};
      border: 1px solid #f97216;
      color: ${uiColors.white};

      &:focus {
        color: ${uiColors.white};
      }

      &:hover,
      &:active {
        color: ${uiColors.white};
        background-color: ${uiColors.red.base};
        border: 1px solid #f97216;
        box-shadow: 0px 0px 0px 3px ${uiColors.red.dark2};
      }
    `,

    [Variant.DangerOutline]: css`
      border: 1px solid #f97216;
      color: #f97216;

      &:focus {
        color: #f97216;
      }

      &:hover,
      &:active {
        color: #f97216;
        background: rgba(249, 114, 22, 0.08);
        box-shadow: 0px 0px 0px 3px ${uiColors.red.dark2};
      }
    `,

    // TODO: Refresh - Dark mode doesn't have a Base Green variant. This just duplicates `Primary`
    [Variant.BaseGreen]: css`
      background-color: ${uiColors.green.dark2};
      border: 1px solid ${uiColors.green.base};
      color: ${uiColors.white};

      &:focus {
        color: ${uiColors.white};
      }

      &:hover,
      &:active {
        color: ${uiColors.white};
        background-color: ${uiColors.green.dark1};
        box-shadow: 0px 0px 0px 3px ${uiColors.green.dark2};
      }
    `,
  },
};

const focusStyle: Record<Mode, Record<Variant, string>> = {
  [Mode.Light]: {
    [Variant.Default]: css`
      &:focus {
        background-color: ${palette.white};
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
    [Variant.Primary]: css`
      &:focus {
        color: ${palette.white};
        background-color: #00593f; // Not quite dark3
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
    [Variant.PrimaryOutline]: css`
      &:focus {
        background-color: ${transparentize(0.96, palette.green.base)};
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
    [Variant.Danger]: css`
      &:focus {
        color: ${palette.white};
        background-color: #c82222; // not quite dark1
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
    [Variant.DangerOutline]: css`
      &:focus {
        color: ${uiColors.red.dark2};
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
    [Variant.BaseGreen]: css`
      &:focus {
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
  },
  [Mode.Dark]: {
    [Variant.Primary]: css`
      &:focus {
        background: ${uiColors.green.dark1};
        box-shadow: 0px 4px 4px rgba(0, 124, 173, 0.4),
          0px 0px 0px 3px ${uiColors.focus};
      }
    `,
    [Variant.PrimaryOutline]: css`
      &:focus {
        background: rgba(10, 208, 91, 0.08);
        border: 1px solid ${uiColors.green.dark1};
        box-shadow: 0px 0px 0px 3px #139fd7;
      }
    `,
    [Variant.Default]: css`
      &:focus {
        background-color: ${uiColors.gray.dark1};
        box-shadow: 0px 0px 0px 3px #2f9fc5;
      }
    `,
    [Variant.Danger]: css`
      &:focus {
        background: ${uiColors.red.base};
        box-shadow: 0px 0px 0px 3px ${uiColors.focus};
      }
    `,
    [Variant.DangerOutline]: css`
      &:focus {
        background: rgba(249, 114, 22, 0.08);
        border: 1px solid #f97216;
        box-shadow: 0px 0px 0px 3px #019ee2;
      }
    `,
    [Variant.BaseGreen]: css`
      &:focus {
        background: ${uiColors.green.dark1};
        box-shadow: 0px 4px 4px rgba(0, 124, 173, 0.4),
          0px 0px 0px 3px ${uiColors.focus};
      }
    `,
  },
};

const disabledStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    background-color: ${palette.gray.light3};
    border: 1px solid ${palette.gray.light2};
    cursor: not-allowed;
    color: ${palette.gray.light1};

    &:hover {
      background-color: ${palette.gray.light3};
      border: 1px solid ${palette.gray.light2};
      cursor: not-allowed;
      color: ${palette.gray.light1};
    }
  `,

  [Mode.Dark]: css`
    background: rgba(61, 79, 88, 0.3);
    border: 1px solid ${uiColors.gray.dark2};
    color: ${uiColors.gray.base};
    cursor: not-allowed;

    &:hover {
      background: rgba(61, 79, 88, 0.3);
      border: 1px solid ${uiColors.gray.dark2};
      color: ${uiColors.gray.base};
      cursor: not-allowed;
    }
  `,
};

const sizeSet: Record<Size, string> = {
  [Size.XSmall]: css`
    height: 22px;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 1em;
    font-weight: bold;
    letter-spacing: 0.4px;
  `,

  [Size.Small]: css`
    height: 28px;
  `,

  [Size.Default]: css`
    height: 36px;
  `,

  [Size.Large]: css`
    height: 48px;
    font-size: 18px;
    line-height: 24px;
  `,
};

const fontStyles = {
  [Mode.Light]: {
    [14]: css`
      font-size: 13px;
      font-weight: 500;
    `,
    [16]: css`
      font-size: 16px;
      // Pixel pushing for optical alignment purposes
      transform: translateY(1px);
      font-weight: 500;
    `,
  },
  [Mode.Dark]: {
    [14]: css`
      font-size: 14px;
    `,
    [16]: css`
      font-size: 16px;
      // Pixel pushing for optical alignment purposes
      transform: translateY(1px);
    `,
  },
};

export function getClassName({
  variant,
  size: sizeProp,
  darkMode,
  baseFontSize,
  disabled,
  showFocus,
}: Required<
  Pick<
    ButtonProps,
    'baseFontSize' | 'variant' | 'size' | 'darkMode' | 'disabled'
  > & { showFocus: boolean }
>) {
  const mode = darkMode ? Mode.Dark : Mode.Light;
  const color = colorSet[mode][variant];
  const focus = focusStyle[mode][variant];
  const size = sizeSet[sizeProp];
  const fontSize = fontStyles[mode][baseFontSize];

  return cx(
    baseButtonStyles,
    color,
    { [focus]: showFocus },
    { [disabledStyle[mode]]: disabled },
    fontSize,
    size,
    css`
      // TODO: Refresh - remove this logic
      font-family: ${mode === 'dark'
        ? fontFamilies.legacy
        : fontFamilies.default};
      border-radius: ${mode === 'dark' ? 4 : 6}px;
    `,
  );
}

const buttonOpacity = 0.76;

const visualDesignPalette = {
  green5: '#0AD05B',
  orange4: '#F97216',
};

export const colorMap: Record<Mode, Record<Variant, string>> = {
  [Mode.Light]: {
    [Variant.Primary]: palette.green.base,
    [Variant.PrimaryOutline]: transparentize(buttonOpacity, palette.green.base),
    [Variant.Default]: palette.gray.light2,
    [Variant.Danger]: palette.red.light1,
    [Variant.DangerOutline]: transparentize(buttonOpacity, palette.red.base),
    [Variant.BaseGreen]: palette.green.light1,
  },
  [Mode.Dark]: {
    [Variant.Primary]: visualDesignPalette.green5,
    [Variant.PrimaryOutline]: transparentize(
      buttonOpacity,
      uiColors.green.base,
    ),
    [Variant.Default]: uiColors.gray.base,
    [Variant.Danger]: visualDesignPalette.orange4,
    [Variant.DangerOutline]: transparentize(
      buttonOpacity,
      visualDesignPalette.orange4,
    ),
    [Variant.BaseGreen]: visualDesignPalette.green5,
  },
};
