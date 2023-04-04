import { TransitionStatus } from 'react-transition-group';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  padding: 0;
  overflow: hidden;
`;

export const expandedContentStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
  `,
  [Theme.Light]: css`
    background-color: ${palette.gray.light3};
  `,
};

const _hiddenStyles = css`
  opacity: 0;
  min-height: 0;
  max-height: 0;
  overflow: hidden;
`;

export const expandedContentTransitionStyles = (
  height: number,
): Record<TransitionStatus, string> => {
  return {
    entered: css`
      opacity: 1;
      min-height: ${spacing[5] + spacing[2]}px;
      max-height: ${height}px;
    `,
    entering: _hiddenStyles,
    exiting: _hiddenStyles,
    exited: _hiddenStyles,
    unmounted: _hiddenStyles,
  };
};
