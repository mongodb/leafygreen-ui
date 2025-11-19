import { transparentize } from 'polished';

import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  color,
  InteractionState,
  spacing,
  Variant as ColorVariant,
} from '@leafygreen-ui/tokens';

import { TooltipVariant } from './Tooltip.types';
import {
  borderRadiuses,
  NOTCH_WIDTH,
  TOOLTIP_MAX_WIDTH,
} from './tooltipConstants';

/**
 * Try to fit all the content on one line (until it hits max-width)
 * Overrides default behavior, which is to set width to size of the trigger.
 */
export const tooltipPopoverStyles = css`
  width: max-content;
`;

const getBaseStyles = (theme: Theme) => css`
  display: flex;
  align-items: center;
  border-radius: ${borderRadiuses[TooltipVariant.Default]}px;
  padding: ${spacing[300]}px ${spacing[400]}px;
  box-shadow: 0px 2px 4px -1px ${transparentize(0.85, palette.black)};
  cursor: default;
  width: fit-content;
  max-width: ${TOOLTIP_MAX_WIDTH}px;
  background-color: ${color[theme].background[ColorVariant.InversePrimary][
    InteractionState.Default
  ]};
  color: ${theme === Theme.Dark ? palette.black : palette.gray.light1};
`;

const minSize = NOTCH_WIDTH + 2 * borderRadiuses[TooltipVariant.Default];
const minHeightStyle = css`
  min-height: ${minSize}px;
`;

const compactStyles = css`
  border-radius: ${borderRadiuses[TooltipVariant.Compact]}px;
  padding: ${spacing[100]}px ${spacing[150]}px;
`;

export const getTooltipStyles = ({
  className,
  isCompact,
  isLeftOrRightAligned,
  tooltipAdjustmentStyles,
  theme,
}: {
  className?: string;
  isCompact: boolean;
  isLeftOrRightAligned: boolean;
  tooltipAdjustmentStyles: string;
  theme: Theme;
}) =>
  cx(
    getBaseStyles(theme),
    {
      [tooltipAdjustmentStyles]: !isCompact,
      [minHeightStyle]: !isCompact && isLeftOrRightAligned,
      [compactStyles]: isCompact,
    },
    className,
  );

export const textStyles = css`
  width: 100%;
  overflow-wrap: anywhere;
  text-transform: none;
  color: inherit;
`;

export const getNotchFill = (theme: Theme) =>
  color[theme].background[ColorVariant.InversePrimary][
    InteractionState.Default
  ];

const baseTriggerStyles = css`
  position: relative;
`;

export const getTriggerStyles = (className?: string) =>
  cx(baseTriggerStyles, className);
