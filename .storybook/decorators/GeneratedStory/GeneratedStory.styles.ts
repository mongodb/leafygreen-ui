import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { typeScales } from '@leafygreen-ui/tokens';

const indent = 16;

export const generatedStoryWrapper = css`
  display: flex;
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

export const combinationStylesCI = css`
  padding-inline: 0;
  border: none;
`;

export const combinationNameStylesCI = css`
  display: none;
`;

export const instanceClassName = createUniqueClassName('instance');
export const instanceStyles = css`
  margin: ${indent / 2}px;
`;
