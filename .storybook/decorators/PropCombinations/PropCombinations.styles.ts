import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { typeScales } from '@leafygreen-ui/tokens';

export const generatedStoryWrapper = css`
  display: flex;
`;

export const tableStyles = css`
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
  padding: 8px;
`;

export const instanceCellStyles = css`
  text-align: center;
  vertical-align: middle;
`;
