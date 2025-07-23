import { mix, transparentize } from 'polished';

import { css, cx } from '@leafygreen-ui/emotion';
import { getTheme, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  fontFamilies,
  fontWeights,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { ButtonProps, Size, Variant } from '../types';

const focusSelector = `&:focus-visible, &[data-focus="true"]`;
const hoverSelector = `&:hover, &[data-hover="true"]`;
const activeSelector = `&:active, &[data-active="true"]`;

const focusBoxShadow = (color: string) => `
    0 0 0 2px ${color}, 
    0 0 0 4px ${palette.blue.light1};
`;

const baseButtonStyles = css`
  // unset browser default
  appearance: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: stretch;
  transition: all ${transitionDuration.default}ms ease-in-out;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;
  font-family: ${fontFamilies.default};
  border-radius: 6px;

  ${focusSelector} {
    outline: none;
  }

  ${activeSelector},
  &:focus,
  &:hover {
    text-decoration: none;
  }
`;

const colorSet: Record<Theme, Record<Variant, string>> = {
  [Theme.Light]: {
    [Variant.Default]: css`
      background-color: ${palette.gray.light3};
      border-color: ${palette.gray.base};
      color: ${palette.black};

      // needed to override any global button styles
      ${focusSelector} {
        color: ${palette.black};
      }

      ${hoverSelector},
      ${activeSelector} {
        color: ${palette.black};
        background-color: ${palette.white};
        box-shadow: 0 0 0 3px ${palette.gray.light2};
      }
    `,

    [Variant.Primary]: css`
      background-color: ${palette.green.dark2};
      border-color: ${palette.green.dark2};
      color: ${palette.white};

      ${focusSelector} {
        color: ${palette.white};
      }

      ${hoverSelector},
      ${activeSelector} {
        color: ${palette.white};
        background-color: #00593f; // Not quite dark3
        border-color: #00593f; // Not quite dark3
        box-shadow: 0 0 0 3px ${palette.green.light2};
      }
    `,

    [Variant.PrimaryOutline]: css`
      background-color: transparent;
      border-color: ${palette.green.dark2};
      color: ${palette.green.dark2};

      ${focusSelector} {
        color: ${palette.green.dark2};
      }

      ${hoverSelector},
      ${activeSelector} {
        color: ${palette.green.dark2};
        background-color: ${transparentize(0.96, palette.green.base)};
        box-shadow: 0px 0px 0px 3px ${palette.green.light2};
      }
    `,

    [Variant.Danger]: css`
      background-color: ${palette.red.base};
      border-color: ${palette.red.base};
      color: ${palette.white};

      ${focusSelector} {
        color: ${palette.white};
      }

      ${hoverSelector},
      ${activeSelector} {
        color: ${palette.white};
        background-color: #c82222; // not quite dark1
        border-color: #c82222; // not quite dark1
        box-shadow: 0px 0px 0px 3px ${palette.red.light3};
      }
    `,

    [Variant.DangerOutline]: css`
      background-color: transparent;
      border-color: ${palette.red.light1};
      color: ${palette.red.base};

      ${focusSelector} {
        color: ${palette.red.base};
      }

      ${hoverSelector},
      ${activeSelector} {
        color: ${palette.red.dark2};
        background-color: ${transparentize(0.96, palette.red.base)};
        border-color: ${palette.red.base};
        box-shadow: 0px 0px 0px 3px ${palette.red.light3};
      }
    `,

    [Variant.BaseGreen]: css`
      background-color: ${palette.green.base};
      border-color: ${palette.green.dark2};
      color: ${palette.green.dark3};

      ${focusSelector} {
        color: ${palette.green.dark3};
      }

      ${hoverSelector},
      ${activeSelector} {
        color: ${palette.green.dark3};
        background-color: ${mix(0.96, palette.green.base, palette.green.dark3)};
        box-shadow: 0px 0px 0px 3px ${palette.green.light2};
      }
    `,
  },
  [Theme.Dark]: {
    [Variant.Default]: css`
      background-color: ${palette.gray.dark2};
      border-color: ${palette.gray.base};
      color: ${palette.white};

      ${focusSelector} {
        color: ${palette.white};
      }

      ${hoverSelector},
      ${activeSelector} {
        background-color: ${palette.gray.dark1};
        border-color: ${palette.gray.base};
        color: ${palette.white};
        box-shadow: 0px 0px 0px 3px ${palette.gray.dark2};
      }
    `,
    [Variant.Primary]: css`
      background-color: ${palette.green.dark2};
      border: 1px solid ${palette.green.base};
      color: ${palette.white};

      ${focusSelector} {
        color: ${palette.white};
      }

      ${hoverSelector},
      ${activeSelector} {
        color: ${palette.white};
        background-color: #00593f; // Off palette
        box-shadow: 0 0 0 3px ${palette.green.dark3};
      }
    `,

    [Variant.PrimaryOutline]: css`
      background-color: transparent;
      border-color: ${palette.green.base};
      color: ${palette.green.base};

      ${focusSelector} {
        color: ${palette.green.base};
      }

      ${hoverSelector},
      ${activeSelector} {
        color: ${palette.green.base};
        background-color: ${transparentize(0.96, palette.green.base)};
        border-color: ${palette.green.base};
        box-shadow: 0px 0px 0px 3px ${palette.green.dark3};
      }
    `,

    [Variant.Danger]: css`
      background-color: ${palette.red.base};
      border-color: ${palette.red.light1};
      color: ${palette.white};

      ${focusSelector} {
        color: ${palette.white};
      }

      ${hoverSelector},
      ${activeSelector} {
        border-color: ${palette.red.light1};
        color: ${palette.white};
        background-color: #c82222; // Off palette
        box-shadow: 0px 0px 0px 3px ${palette.yellow.dark3}; // yes, yellow
      }
    `,

    [Variant.DangerOutline]: css`
      border-color: ${palette.red.light1};
      color: ${palette.red.light1};

      ${focusSelector} {
        color: ${palette.red.light1};
      }

      ${hoverSelector},
      ${activeSelector} {
        color: ${palette.red.light1};
        background-color: ${transparentize(0.96, palette.red.base)};
        box-shadow: 0px 0px 0px 3px ${palette.yellow.dark3}; // yes, yellow
      }
    `,

    [Variant.BaseGreen]: css`
      background-color: ${palette.green.base};
      border-color: ${palette.green.dark2};
      color: ${palette.green.dark3};

      ${focusSelector} {
        color: ${palette.green.dark3};
      }

      ${hoverSelector},
      ${activeSelector} {
        color: ${palette.green.dark3};
        background-color: ${mix(
          0.96,
          palette.green.base,
          palette.green.light3,
        )};
        border-color: ${palette.green.dark2};
        box-shadow: 0px 0px 0px 3px ${palette.green.dark3};
      }
    `,
  },
};

const focusStyle: Record<Theme, Record<Variant, string>> = {
  [Theme.Light]: {
    [Variant.Default]: css`
      ${focusSelector} {
        background-color: ${palette.white};
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
    [Variant.Primary]: css`
      ${focusSelector} {
        color: ${palette.white};
        background-color: #00593f; // Not quite dark3
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
    [Variant.PrimaryOutline]: css`
      ${focusSelector} {
        background-color: ${transparentize(0.96, palette.green.base)};
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
    [Variant.Danger]: css`
      ${focusSelector} {
        color: ${palette.white};
        background-color: #c82222; // not quite dark1
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
    [Variant.DangerOutline]: css`
      ${focusSelector} {
        color: ${palette.red.dark2};
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
    [Variant.BaseGreen]: css`
      ${focusSelector} {
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
  },
  [Theme.Dark]: {
    [Variant.Default]: css`
      ${focusSelector} {
        background-color: ${palette.gray.dark1};
        box-shadow: ${focusBoxShadow(palette.black)};
      }
    `,
    [Variant.Primary]: css`
      ${focusSelector} {
        background-color: #00593f; // Off palette
        box-shadow: ${focusBoxShadow(palette.black)};
      }
    `,
    [Variant.PrimaryOutline]: css`
      ${focusSelector} {
        background-color: ${transparentize(0.96, palette.green.base)};
        border-color: ${palette.green.base};
        box-shadow: ${focusBoxShadow(palette.black)};
      }
    `,
    [Variant.Danger]: css`
      ${focusSelector} {
        background-color: #c82222; // Off palette
        box-shadow: ${focusBoxShadow(palette.black)};
      }
    `,
    [Variant.DangerOutline]: css`
      ${focusSelector} {
        background-color: ${transparentize(0.96, palette.red.base)};
        border-color: ${palette.red.light1};
        box-shadow: ${focusBoxShadow(palette.black)};
      }
    `,
    [Variant.BaseGreen]: css`
      ${focusSelector} {
        background-color: ${palette.green.base};
        box-shadow: ${focusBoxShadow(palette.black)};
      }
    `,
  },
};

const disabledStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &,
    ${hoverSelector}, ${activeSelector} {
      background-color: ${palette.gray.light2};
      border-color: ${palette.gray.light1};
      color: ${palette.gray.base};
      box-shadow: none;
      cursor: not-allowed;
    }

    ${focusSelector} {
      color: ${palette.gray.base};
      box-shadow: ${focusBoxShadow(palette.white)};
    }
  `,

  [Theme.Dark]: css`
    &,
    ${hoverSelector}, ${activeSelector} {
      background-color: ${palette.gray.dark3};
      border-color: ${palette.gray.dark2};
      color: ${palette.gray.dark1};
      box-shadow: none;
      cursor: not-allowed;
    }

    ${focusSelector} {
      color: ${palette.gray.dark1};
      box-shadow: ${focusBoxShadow(palette.black)};
    }
  `,
};

const sizeStyle: Record<Size, string> = {
  [Size.XSmall]: css`
    height: 22px;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 1em;
    font-weight: ${fontWeights.bold};
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

const fontStyles: Record<BaseFontSize, string> = {
  [BaseFontSize.Body1]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    font-weight: ${fontWeights.medium};
  `,
  [BaseFontSize.Body2]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
    // Pixel pushing for optical alignment purposes
    transform: translateY(1px);
    font-weight: ${fontWeights.medium};
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
  const theme = getTheme(darkMode);
  const color = colorSet[theme][variant];
  const focus = focusStyle[theme][variant];
  const size = sizeStyle[sizeProp];
  const fontSize = fontStyles[baseFontSize];

  return cx(
    baseButtonStyles,
    color,
    fontSize,
    size,
    { [focus]: !disabled },
    { [disabledStyle[theme]]: disabled },
  );
}
