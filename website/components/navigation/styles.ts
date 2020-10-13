import { css } from 'emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { p } from 'styles/spacing';

export const leftRightPadding = p.x4;

export const borderColor = uiColors.gray.light2;

export const ulStyleOverrides = css`
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  padding: 0;
  list-style-type: none;
`;
