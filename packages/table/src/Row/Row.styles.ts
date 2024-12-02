import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  focusRing,
  hoverRing,
} from '@leafygreen-ui/tokens';

const getDisabledStyles = (theme: Theme) => css`
  pointer-events: none;
  background-color: ${color[theme].background.disabled.default};
  color: ${color[theme].text.disabled.default};
`;

const getClickableStyles = (theme: Theme) => css`
  border-radius: ${borderRadius[150]}px;
  cursor: pointer;

  &:hover:not(:focus) {
    outline: none;
    box-shadow: inset ${hoverRing[theme].gray};
  }

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: inset ${focusRing[theme].input};
  }
`;

export const getRowBaseStyles = ({
  className,
  isClickable,
  isDisabled,
  theme,
}: {
  className?: string;
  isClickable: boolean;
  isDisabled: boolean;
  theme: Theme;
}) =>
  cx(
    {
      [getDisabledStyles(theme)]: isDisabled,
      [getClickableStyles(theme)]: isClickable,
    },
    className,
  );

// applied directly to rows for VS
const getGrayZebraRowStyles = (theme: Theme) => css`
  background-color: ${color[theme].background.secondary.default};
`;

const getZebraStyles = (theme: Theme) => css`
  &:nth-of-type(even) {
    ${getGrayZebraRowStyles(theme)}
  }
`;

// applied directly to rows for VS
const getSelectedRowStyles = (theme: Theme) => css`
  background-color: ${color[theme].background.secondary.focus};
`;

const getExpandedContentParentStyles = (theme: Theme) => css`
  background-color: ${color[theme].background.secondary.default};
`;

export const getRowWithRTStyles = ({
  className,
  isDisabled,
  isExpanded,
  isOddVSRow,
  isSelected,
  isVirtualRow,
  shouldAlternateRowColor,
  theme,
}: {
  className?: string;
  isDisabled: boolean;
  isExpanded: boolean;
  isOddVSRow: boolean;
  isSelected: boolean;
  isVirtualRow: boolean;
  shouldAlternateRowColor: boolean;
  theme: Theme;
}) =>
  cx(
    {
      [getZebraStyles(theme)]:
        !isVirtualRow && shouldAlternateRowColor && !isSelected,
      [getGrayZebraRowStyles(theme)]:
        isOddVSRow && shouldAlternateRowColor && !isSelected,
    },
    {
      [getExpandedContentParentStyles(theme)]: isExpanded && !isSelected,
    },
    {
      [getSelectedRowStyles(theme)]: isSelected && !isDisabled,
    },
    className,
  );

export const getRowWithoutRTStyles = ({
  className,
  shouldAlternateRowColor,
  theme,
}: {
  className?: string;
  shouldAlternateRowColor?: boolean;
  theme: Theme;
}) =>
  cx(
    {
      [getZebraStyles(theme)]: shouldAlternateRowColor,
    },
    className,
  );
