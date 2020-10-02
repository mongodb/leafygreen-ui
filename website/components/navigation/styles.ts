import { css } from 'emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { uiColors } from '@leafygreen-ui/palette';

export const leftRightPadding = css`
  padding-left: ${spacing[4]}px;
  padding-right: ${spacing[4]}px;
`;

export const borderColor = uiColors.gray.light2;

export const ulStyleOverrides = css`
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  padding: 0;
  list-style-type: none;
`;
