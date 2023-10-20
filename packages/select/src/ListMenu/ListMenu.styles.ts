import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { fontFamilies, Size, spacing } from '@leafygreen-ui/tokens';

import { colorSets, sizeSets } from '../styleSets';

export const popoverClassName = createUniqueClassName('select-popover');

export const maxMenuHeight = 274;
export const menuMargin = spacing[2];

export const baseMenuStyle = css`
  position: relative;
  text-align: left;
  width: 100%;
  border-radius: 3px;
  line-height: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: auto;
`;

export const autoWidthStyles = css`
  width: max-content;
`;

export const getMenuStyles = (theme: Theme, size: Size) => {
  const sizeSet = sizeSets[size];
  const colorSet = colorSets[theme];

  return cx(
    css`
      font-family: ${fontFamilies.default};
      font-size: ${sizeSet.option.text}px;
      min-height: ${sizeSet.height}px;
      background-color: ${colorSet.option.background.base};
      border-radius: 12px;
      box-shadow: 0 4px 7px 0 ${colorSet.menu.shadow};
      padding: ${spacing[2]}px 0;
      border: 1px solid ${colorSet.menu.border};
    `,
  );
};
