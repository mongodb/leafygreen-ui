import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { typeScales } from '@leafygreen-ui/tokens';

const indent = 16;

export const generatedStoryWrapper = css`
  min-width: max-content;
`;

export const propWrapperStyles = css`
  width: 100%;
`;

export const propWrapperStylesDarkModeProp = css`
  flex: 1;
  flex-direction: row;
`;

export const propWrapperStylesFirstProp = css`
  flex-direction: row;
`;

export const combinationStyles = css`
  position: relative;
  overflow: visible;
  color: ${palette.gray.base};
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  width: max-content;
  max-width: 100%;
  width: 100%;
`;

export const combinationStylesDarkModeProp = css`
  padding: ${indent}px;
  background-color: ${palette.white};
  color: ${palette.gray.base};
  border-color: ${palette.gray.light1};
`;

export const combinationStylesDarkMode = css`
  background-color: ${palette.black};
  color: ${palette.gray.light1};
  border-color: ${palette.gray.dark2};
`;

export const instanceStyles = css`
  margin: 0 ${indent}px;
`;
