import { css, cx } from '@leafygreen-ui/emotion';
import {
  createUniqueClassName,
  RecursiveRecord,
  Theme,
} from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  color,
  InteractionState,
  Property,
  transitionDuration,
  typeScales,
  Variant as VariantToken,
} from '@leafygreen-ui/tokens';

import { Variant } from './Chip.types';

export const chipInlineDefinitionClassName = createUniqueClassName(
  'chip-inline-definition',
);
export const chipTextClassName = createUniqueClassName('chip-text');

/**
 * The line-height of the chip.
 */
export const lineHeight: Record<BaseFontSize, number> = {
  [BaseFontSize.Body1]: 18,
  [BaseFontSize.Body2]: 20,
};

/**
 * The font-size of the chip.
 */
export const fontSize: Record<BaseFontSize, number> = {
  [BaseFontSize.Body1]: typeScales.body1.fontSize,
  [BaseFontSize.Body2]: typeScales.body2.fontSize,
};

/**
 * Padding on a chip (in px)
 */
export const chipWrapperPadding: Record<
  BaseFontSize,
  { x: number; y: number }
> = {
  [BaseFontSize.Body1]: {
    y: 0,
    x: 6,
  },
  [BaseFontSize.Body2]: {
    y: 2,
    x: 6,
  },
} as const;

/**
 * Chip Variants
 */
// export const variantColor: Record<
//   Variant,
//   Record<
//     Theme,
//     {
//       color: string;
//       bgColor: string;
//       focusBgColor: string;
//       iconColor: string;
//     }
//   >
// > = {
//   [Variant.Blue]: {
//     [Theme.Dark]: {
//       color: palette.blue.light2,
//       bgColor: palette.blue.dark3,
//       focusBgColor: palette.blue.dark1,
//       iconColor: palette.blue.light2,
//     },
//     [Theme.Light]: {
//       color: palette.blue.dark3,
//       bgColor: palette.blue.light3,
//       focusBgColor: '#89D2FF',
//       iconColor: palette.blue.dark2,
//     },
//   },
//   [Variant.Red]: {
//     [Theme.Dark]: {
//       color: palette.red.light2,
//       bgColor: palette.red.dark3,
//       focusBgColor: '#BB1A1A',
//       iconColor: palette.red.light2,
//     },
//     [Theme.Light]: {
//       color: palette.red.dark3,
//       bgColor: palette.red.light3,
//       focusBgColor: '#FF9789',
//       iconColor: palette.red.dark2,
//     },
//   },
//   [Variant.Gray]: {
//     [Theme.Dark]: {
//       color: palette.gray.light2,
//       bgColor: palette.gray.dark2,
//       focusBgColor: palette.gray.base,
//       iconColor: palette.gray.dark1,
//     },
//     [Theme.Light]: {
//       color: palette.black,
//       bgColor: palette.gray.light2,
//       focusBgColor: '#A0A9A8',
//       iconColor: palette.gray.light1,
//     },
//   },
//   [Variant.Green]: {
//     [Theme.Dark]: {
//       color: palette.green.light2,
//       bgColor: palette.green.dark3,
//       focusBgColor: palette.green.dark1,
//       iconColor: palette.green.dark2,
//     },
//     [Theme.Light]: {
//       color: palette.green.dark3,
//       bgColor: palette.green.light3,
//       focusBgColor: palette.green.light1,
//       iconColor: palette.green.light2,
//     },
//   },
//   [Variant.Purple]: {
//     [Theme.Dark]: {
//       color: palette.purple.light2,
//       bgColor: palette.purple.dark3,
//       focusBgColor: '#892CCA',
//       iconColor: palette.purple.light2,
//     },
//     [Theme.Light]: {
//       color: palette.purple.dark3,
//       bgColor: palette.purple.light3,
//       focusBgColor: '#E19AFF',
//       iconColor: palette.purple.dark2,
//     },
//   },
//   [Variant.Yellow]: {
//     [Theme.Dark]: {
//       color: palette.yellow.light2,
//       bgColor: palette.yellow.dark3,
//       focusBgColor: '#C27823',
//       iconColor: palette.yellow.light2,
//     },
//     [Theme.Light]: {
//       color: palette.yellow.dark3,
//       bgColor: palette.yellow.light3,
//       focusBgColor: '#FFD664',
//       iconColor: palette.yellow.dark2,
//     },
//   },
// };

export const variantColor = {
  [Variant.Blue]: {
    [Theme.Dark]: {
      [Property.Background]: {
        [InteractionState.Default]: palette.blue.dark3,
        [InteractionState.Focus]: palette.blue.dark1,
      },
      [Property.Text]: {
        [InteractionState.Default]: palette.blue.light2,
      },
      [Property.Icon]: {
        [InteractionState.Default]: palette.blue.light2,
      },
    },
    [Theme.Light]: {
      [Property.Background]: {
        [InteractionState.Default]: palette.blue.light3,
        [InteractionState.Focus]: '#89D2FF',
      },
      [Property.Text]: {
        [InteractionState.Default]: palette.blue.dark3,
      },
      [Property.Icon]: {
        [InteractionState.Default]: palette.blue.dark2,
      },
    },
  },
  [Variant.Red]: {
    [Theme.Dark]: {
      [Property.Background]: {
        [InteractionState.Default]: palette.red.dark3,
        [InteractionState.Focus]: '#BB1A1A',
      },
      [Property.Text]: {
        [InteractionState.Default]: palette.red.light2,
      },
      [Property.Icon]: {
        [InteractionState.Default]: palette.red.light2,
      },
    },
    [Theme.Light]: {
      [Property.Background]: {
        [InteractionState.Default]: palette.red.light3,
        [InteractionState.Focus]: '#FF9789',
      },
      [Property.Text]: {
        [InteractionState.Default]: palette.red.dark3,
      },
      [Property.Icon]: {
        [InteractionState.Default]: palette.red.dark2,
      },
    },
  },
  [Variant.Gray]: {
    [Theme.Dark]: {
      [Property.Background]: {
        [InteractionState.Default]: palette.gray.dark2,
        [InteractionState.Focus]: palette.gray.base,
      },
      [Property.Text]: {
        [InteractionState.Default]: palette.gray.light2,
      },
      [Property.Icon]: {
        [InteractionState.Default]: palette.gray.dark1,
      },
    },
    [Theme.Light]: {
      [Property.Background]: {
        [InteractionState.Default]: palette.gray.light2,
        [InteractionState.Focus]: '#A0A9A8',
      },
      [Property.Text]: {
        [InteractionState.Default]: palette.black,
      },
      [Property.Icon]: {
        [InteractionState.Default]: palette.gray.light1,
      },
    },
  },
  [Variant.Green]: {
    [Theme.Dark]: {
      [Property.Background]: {
        [InteractionState.Default]: palette.green.dark3,
        [InteractionState.Focus]: palette.green.dark1,
      },
      [Property.Text]: {
        [InteractionState.Default]: palette.green.light2,
      },
      [Property.Icon]: {
        [InteractionState.Default]: palette.green.light2,
      },
    },
    [Theme.Light]: {
      [Property.Background]: {
        [InteractionState.Default]: palette.green.light3,
        [InteractionState.Focus]: palette.green.light1,
      },
      [Property.Text]: {
        [InteractionState.Default]: palette.green.dark3,
      },
      [Property.Icon]: {
        [InteractionState.Default]: palette.green.dark2,
      },
    },
  },
  [Variant.Purple]: {
    [Theme.Dark]: {
      [Property.Background]: {
        [InteractionState.Default]: palette.purple.dark3,
        [InteractionState.Focus]: '#892CCA',
      },
      [Property.Text]: {
        [InteractionState.Default]: palette.purple.light2,
      },
      [Property.Icon]: {
        [InteractionState.Default]: palette.purple.light2,
      },
    },
    [Theme.Light]: {
      [Property.Background]: {
        [InteractionState.Default]: palette.purple.light3,
        [InteractionState.Focus]: '#E19AFF',
      },
      [Property.Text]: {
        [InteractionState.Default]: palette.purple.dark3,
      },
      [Property.Icon]: {
        [InteractionState.Default]: palette.purple.dark2,
      },
    },
  },
  [Variant.Yellow]: {
    [Theme.Dark]: {
      [Property.Background]: {
        [InteractionState.Default]: palette.yellow.dark3,
        [InteractionState.Focus]: '#C27823',
      },
      [Property.Text]: {
        [InteractionState.Default]: palette.yellow.light2,
      },
      [Property.Icon]: {
        [InteractionState.Default]: palette.yellow.light2,
      },
    },
    [Theme.Light]: {
      [Property.Background]: {
        [InteractionState.Default]: palette.yellow.light3,
        [InteractionState.Focus]: '#FFD664',
      },
      [Property.Text]: {
        [InteractionState.Default]: palette.yellow.dark3,
      },
      [Property.Icon]: {
        [InteractionState.Default]: palette.yellow.dark2,
      },
    },
  },
} as const satisfies RecursiveRecord<
  [Variant, Theme, Property, InteractionState, string],
  false
>;

const chipTextTruncateDisabled = {
  [Theme.Dark]: {
    [VariantToken.Disabled]: {
      [InteractionState.Focus]: palette.gray.dark1,
    },
  },
  [Theme.Light]: {
    [VariantToken.Disabled]: {
      [InteractionState.Focus]: palette.gray.light1,
    },
  },
};

/**
 * Chip wrapper
 */
export const chipWrapperThemeStyle = (variant: Variant, theme: Theme) => css`
  color: ${variantColor[variant][theme].text.default};
  background-color: ${variantColor[variant][theme].background.default};
  transition: background-color ${transitionDuration.faster}ms ease-in-out;
`;

export const chipWrapperBaseStyle = css`
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  border-radius: 4px;
`;

export const chipWrapperSizeStyle = (baseFontSize: BaseFontSize) => css`
  font-size: ${fontSize[baseFontSize]}px;
  line-height: ${lineHeight[baseFontSize]}px;
`;

export const chipWrapperBaseDisabledStyles = css`
  cursor: not-allowed;
`;

export const chipWrapperDisabledStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.base};
    background-color: ${palette.gray.light3};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark2};
    background-color: ${palette.gray.dark4};
    box-shadow: inset 0 0 1px 1px ${palette.gray.dark2};
  `,
};

/**
 * Chip text
 */
export const getChipTextStyles = (
  baseFontSize: BaseFontSize,
  variant: Variant,
  theme: Theme,
  isDisabled = false,
  isDismissible = false,
) =>
  cx(
    css`
      padding-inline: ${chipWrapperPadding[baseFontSize].x}px;
      padding-block: ${chipWrapperPadding[baseFontSize].y}px;

      display: flex;
      gap: 2px;

      svg {
        align-self: center;
        color: ${variantColor[variant][theme].icon.default};
      }

      &:focus-within {
        background-color: ${variantColor[variant][theme].background.focus};
      }

      .${chipInlineDefinitionClassName} {
        &:focus-visible,
        &:focus {
          outline: none;
        }
      }
    `,
    {
      [css`
        svg {
          color: ${color[theme].icon.disabled.default};
        }

        // truncated + disabled + focused styles (a truncated disabled chip is still focusable)
        &:focus-within {
          background-color: ${chipTextTruncateDisabled[theme].disabled.focus};
        }
      `]: isDisabled,
    },
    {
      [css`
        padding-inline-end: 2px;
      `]: isDismissible,
    },
  );

// export const chipTextSizeStyle = (baseFontSize: BaseFontSize) => css`
//   padding-inline: ${chipWrapperPadding[baseFontSize].x}px;
//   padding-block: ${chipWrapperPadding[baseFontSize].y}px;
// `;

// export const chipTextDismissSizeStyle = css`
//   padding-inline-end: 2px;
// `;

// export const chipTextStyles = (variant: Variant, theme: Theme) => css`
//   display: flex;
//   gap: 2px;

//   svg {
//     align-self: center;
//   }

//   &:focus-within {
//     background-color: ${variantColor[variant][theme].focusBgColor};
//   }

//   .${chipInlineDefinitionClassName} {
//     &:focus-visible,
//     &:focus {
//       outline: none;
//     }
//   }
// `;

// export const chipTextDisabledStyles: Record<Theme, string> = {
//   [Theme.Dark]: css`
//     svg {
//       color: ${palette.gray.dark1};
//     }

//     &:focus-within {
//       background-color: ${palette.gray.dark1};
//     }
//   `,
//   [Theme.Light]: css`
//     svg {
//       color: ${palette.gray.base};
//     }

//     &:focus-within {
//       background-color: ${palette.gray.light1};
//     }
//   `,
// };
