import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

const PINNED_SERIES_LIST_MAX_HEIGHT = 102;

export const getSeriesListStyles = (tooltipPinned: boolean) => css`
  all: unset;
  overflow-y: auto;
  max-height: ${tooltipPinned ? `${PINNED_SERIES_LIST_MAX_HEIGHT}px` : 'none'};
  padding: 0 ${spacing[150]}px ${spacing[150]}px;
  display: grid;
  gap: ${spacing[100]}px;
`;
