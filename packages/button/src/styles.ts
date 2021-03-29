import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Size, Variant, Mode, ButtonProps } from './types';

const baseButtonStyles = css`
  // unset browser default
  appearance: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: 0px solid transparent;

  display: inline-flex;
  align-items: stretch;
  border-radius: 4px;
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
`;

const colorSet: Record<Mode, Record<Variant, string>> = {
  [Mode.Light]: {
    [Variant.Primary]: css`
      background-color: ${uiColors.green.dark1};
      box-shadow: 0px 2px 3px rgba(19, 170, 82, 0.4);
      color: ${uiColors.white};

      &:hover,
      &:active {
        background-color: ${uiColors.green.dark2};
        box-shadow: 0px 2px 3px rgba(19, 170, 82, 0.4), 0px 0px 0px 3px #c3e7ca;
      }
    `,

    [Variant.PrimaryOutline]: css`
      border: 1px solid ${uiColors.green.dark1};
      color: ${uiColors.green.dark2};

      &:hover,
      &:active {
        background-color: rgba(9, 128, 76, 0.04); // green dark 1
        border: 1px solid ${uiColors.green.dark1};
        box-shadow: 0px 0px 0px 3px ${uiColors.green.light2};
      }
    `,

    [Variant.Default]: css`
      background-color: ${uiColors.gray.light3};
      border: 1px solid ${uiColors.gray.base};
      box-shadow: 0px 1px 2px rgba(6, 22, 33, 0.3);
      color: ${uiColors.gray.dark2};

      &:hover,
      &:active {
        background-color: ${uiColors.white};
        border: 1px solid ${uiColors.gray.dark1};
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3),
          0px 0px 0px 3px ${uiColors.gray.light2};
      }
    `,

    [Variant.Danger]: css`
      background-color: ${uiColors.red.base};
      box-shadow: 0px 1px 2px rgba(207, 74, 34, 0.4);
      color: ${uiColors.white};

      &:hover,
      &:active {
        background-color: ${uiColors.red.dark1};
        box-shadow: 0px 4px 4px rgba(207, 74, 34, 0.25),
          0px 0px 0px 3px ${uiColors.red.light2};
      }
    `,

    [Variant.DangerOutline]: css`
      border: 1px solid ${uiColors.red.base};
      color: ${uiColors.red.dark2};

      &:hover,
      &:active {
        background: rgba(207, 74, 34, 0.04);
        border: 1px solid ${uiColors.red.base};
        box-shadow: 0px 0px 0px 4px ${uiColors.red.light2};
      }
    `,
  },
  [Mode.Dark]: {
    [Variant.Primary]: css`
      background-color: ${uiColors.green.dark2};
      border: 1px solid ${uiColors.green.base};
      color: ${uiColors.white};

      &:hover,
      &:active {
        background-color: ${uiColors.green.dark1};
        box-shadow: 0px 0px 0px 3px ${uiColors.green.dark2};
      }
    `,

    [Variant.PrimaryOutline]: css`
      border: 1px solid ${uiColors.green.base};
      color: #0ad05b;

      &:hover,
      &:active {
        background-color: rgba(10, 208, 91, 0.08);
        border: 1px solid ${uiColors.green.base};
        box-shadow: 0px 0px 0px 3px ${uiColors.green.dark2};
      }
    `,

    [Variant.Default]: css`
      background-color: ${uiColors.gray.dark2};
      border: 1px solid ${uiColors.gray.base};
      color: ${uiColors.white};

      &:hover,
      &:active {
        background-color: ${uiColors.gray.dark1};
        border: 1px solid ${uiColors.gray.base};
        box-shadow: 0px 0px 0px 3px ${uiColors.gray.dark2};
      }
    `,

    [Variant.Danger]: css`
      background-color: ${uiColors.red.dark1};
      border: 1px solid #f97216;
      color: ${uiColors.white};

      &:hover,
      &:active {
        background-color: ${uiColors.red.base};
        border: 1px solid #f97216;
        box-shadow: 0px 0px 0px 3px ${uiColors.red.dark2};
      }
    `,

    [Variant.DangerOutline]: css`
      border: 1px solid #f97216;
      color: #f97216;

      &:hover,
      &:active {
        background: rgba(249, 114, 22, 0.08);
        box-shadow: 0px 0px 0px 3px ${uiColors.red.dark2};
      }
    `,
  },
};

const focusStyle: Record<Mode, Record<Variant, string>> = {
  [Mode.Light]: {
    [Variant.Primary]: css`
      &:focus {
        background-color: ${uiColors.green.dark2};
        box-shadow: 0px 4px 4px rgba(0, 124, 173, 0.4),
          0px 0px 0px 3px ${uiColors.focus};
      }
    `,
    [Variant.PrimaryOutline]: css`
      &:focus {
        background-color: rgba(9, 128, 76, 0.04);
        border: 1px solid ${uiColors.green.dark1};
        box-shadow: 0px 0px 0px 3px ${uiColors.focus};
      }
    `,
    [Variant.Default]: css`
      &:focus {
        background: ${uiColors.white};
        border: 1px solid ${uiColors.gray.dark1};
        box-shadow: 0px 4px 4px rgba(0, 124, 173, 0.4),
          0px 0px 0px 3px ${uiColors.focus};
      }
    `,
    [Variant.Danger]: css`
      &:focus {
        background-color: ${uiColors.red.dark1};
        box-shadow: 0px 4px 4px rgba(0, 124, 173, 0.4),
          0px 0px 0px 3px ${uiColors.focus};
      }
    `,
    [Variant.DangerOutline]: css`
      &:focus {
        background: rgba(207, 74, 34, 0.04);
        border: 1px solid ${uiColors.red.dark2};
        box-shadow: 0px 0px 0px 3px #019ee2;
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
  },
};

const disabledStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    background-color: ${uiColors.gray.light2};
    border: 1px solid ${uiColors.gray.light2};
    box-shadow: 0px 0px 0px 1px ${uiColors.gray.light1};
    cursor: not-allowed;
    color: ${uiColors.gray.dark1};

    &:hover {
      background-color: ${uiColors.gray.light2};
      border: 1px solid ${uiColors.gray.light2};
      box-shadow: 0px 0px 0px 1px ${uiColors.gray.light1};
      cursor: not-allowed;
      color: ${uiColors.gray.dark1};
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
  [14]: css`
    font-size: 14px;
  `,
  [16]: css`
    font-size: 16px;
    // Pixel pushing for optical alignment purposes
    transform: translateY(1px);
  `,
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
  const fontSize = fontStyles[baseFontSize];

  return cx(
    baseButtonStyles,
    color,
    { [focus]: showFocus },
    { [disabledStyle[mode]]: disabled },
    fontSize,
    size,
  );
}
