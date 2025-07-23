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
  spacing,
  transitionDuration,
  typeScales,
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
    y: spacing[0],
    x: spacing[100],
  },
  [BaseFontSize.Body2]: {
    y: spacing[50],
    x: spacing[100],
  },
} as const;

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
        [InteractionState.Default]: palette.gray.light1,
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
        [InteractionState.Default]: palette.gray.dark1,
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

const truncateDisabledColor = {
  [Theme.Dark]: palette.gray.dark1,
  [Theme.Light]: palette.gray.light1,
};

const wrapperDisabledColor = {
  [Theme.Dark]: palette.gray.dark2,
  [Theme.Light]: palette.gray.base,
};

export const wrapperBaseStyles = (
  baseFontSize: BaseFontSize,
  variant: Variant,
  theme: Theme,
) => css`
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  border-radius: 4px;
  font-size: ${fontSize[baseFontSize]}px;
  line-height: ${lineHeight[baseFontSize]}px;

  color: ${variantColor[variant][theme].text.default};
  background-color: ${variantColor[variant][theme].background.default};
  transition: background-color ${transitionDuration.faster}ms ease-in-out;
`;

export const wrapperDisabledStyles = (theme: Theme) =>
  cx(
    css`
      cursor: not-allowed;
      background-color: ${color[theme].background.secondary.default};
      color: ${wrapperDisabledColor[theme]};
    `,
    {
      [css`
        box-shadow: inset 0 0 1px 1px ${palette.gray.dark2};
      `]: theme === Theme.Dark,
    },
  );

/**
 * Chip wrapper
 */
export const getWrapperStyles = (
  baseFontSize: BaseFontSize,
  variant: Variant,
  theme: Theme,
  isDisabled = false,
) =>
  cx(wrapperBaseStyles(baseFontSize, variant, theme), {
    [wrapperDisabledStyles(theme)]: isDisabled,
  });

export const textBaseStyles = (
  baseFontSize: BaseFontSize,
  variant: Variant,
  theme: Theme,
) => css`
  padding-inline: ${chipWrapperPadding[baseFontSize].x}px;
  padding-block: ${chipWrapperPadding[baseFontSize].y}px;

  display: flex;
  gap: ${spacing[50]}px;

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
`;

export const textDisabledStyles = (theme: Theme) => css`
  svg {
    color: ${color[theme].icon.disabled.default};
  }

  // truncated + disabled + focused styles (a truncated disabled chip is still focusable)
  &:focus-within {
    background-color: ${truncateDisabledColor[theme]};
  }
`;

export const textDismissibleStyles = css`
  padding-inline-end: ${spacing[50]}px;
`;

/**
 * Chip text
 */
export const getTextStyles = (
  baseFontSize: BaseFontSize,
  variant: Variant,
  theme: Theme,
  isDisabled = false,
  isDismissible = false,
) =>
  cx(textBaseStyles(baseFontSize, variant, theme), {
    [textDisabledStyles(theme)]: isDisabled,
    [textDismissibleStyles]: isDismissible,
  });

export const inlineDefinitionStyles = css`
  white-space: normal;
`;
