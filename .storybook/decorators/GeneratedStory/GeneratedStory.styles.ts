import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { typeScales } from '@leafygreen-ui/tokens';

const indent = 16;

export const generatedStoryWrapper = css`
  /* padding: ${indent}px; */
`;

export const propSectionStyles = css`
  &#darkMode {
    display: flex;
  }
`;

export const combinationClassName = createUniqueClassName('combo');
export const combinationStyles = css`
  position: relative;
  padding: 4px ${indent}px;
  overflow: visible;
  border-left: 1px solid;
  color: ${palette.gray.base};
  border-color: ${palette.gray.light1};
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  width: max-content;
  max-width: 100%;

  &#darkMode-true,
  &#darkMode-false {
    flex: 1;
    max-width: 50%;
    padding: ${indent}px;
  }

  &#darkMode-true,
  &#darkMode-true .${combinationClassName} {
    background-color: ${palette.black};
    color: ${palette.gray.base};
    border-color: ${palette.gray.dark2};
  }
  &#darkMode-false,
  &#darkMode-false .${combinationClassName} {
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

export const instanceStyles = css`
  padding: 8px ${indent}px 0;
`;
