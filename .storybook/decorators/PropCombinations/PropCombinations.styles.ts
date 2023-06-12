import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { breakpoints, typeScales } from '@leafygreen-ui/tokens';

export const generatedStoryWrapper = css`
  width: 100vw;
  min-width: ${breakpoints.XLDesktop}px;
  display: flex;
`;

export const tableStyles = css`
  flex: 1;
  width: max-content;
  max-width: 100%;
  border-collapse: collapse;
  padding: 16px;
`;

export const combinationRowStyles = css`
  position: relative;
  overflow: visible;

  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;

  color: ${palette.gray.base};
  background-color: ${palette.white};
`;

export const combinationDarkModeStyles = css`
  background-color: ${palette.black};
  color: ${palette.gray.base};
`;

export const cellStyles = css`
  padding: 16px;
`;

export const instanceCellStyles = css`
  vertical-align: middle;
`;
