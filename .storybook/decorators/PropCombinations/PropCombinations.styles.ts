import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { typeScales } from '@leafygreen-ui/tokens';

const indent = 16;

export const generatedStoryWrapper = css`
as  width: max-content;
`;

export const propWrapperStyles = css`
  width: 100%;
  /* display: flex; */
  /* flex-direction: column; */
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
`;

export const combinationStylesDarkModeProp = css`
  flex: 1;
  max-width: 50%;
  padding: ${indent}px;

  &#darkMode-true {
    background-color: ${palette.black};
    color: ${palette.gray.base};
    border-color: ${palette.gray.dark2};
  }
  &#darkMode-false {
    background-color: ${palette.white};
    color: ${palette.gray.base};
    border-color: ${palette.gray.light1};
  }
`;

export const instanceStyles = css`
  margin: ${indent / 2}px;
`;
