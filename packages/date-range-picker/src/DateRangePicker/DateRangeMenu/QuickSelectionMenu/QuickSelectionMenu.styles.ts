import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const quickSelectionClassName = createUniqueClassName(
  'date-range-quick-selection',
);

export const quickSelectMenuStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]}px;
  padding: ${spacing[4]}px;
  // TODO: Fix the menu vs clear button z-index
`;

export const quickSelectMenuThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.gray.light3};
    border-inline-end: 1px solid ${palette.gray.light2};
  `,
  [Theme.Dark]: css`
    // TODO:
  `,
};

export const quickSelectMenuMonthSelectContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]}px;
`;

export const quickSelectMenuSelectionsContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: ${spacing[2]}px;
`;
