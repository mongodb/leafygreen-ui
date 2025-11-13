import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { boxShadows, color, Size, spacing } from '@leafygreen-ui/tokens';

import { sizeSets } from '../styleSets';

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

  return cx(
    css`
      min-height: ${sizeSet.height}px;
      border-radius: 12px;
      box-shadow: ${boxShadows[theme][1]};
      padding: ${spacing[200]}px 0;
      background-color: ${color[theme].background.primary.default};
      border: 1px solid ${color[theme].border.secondary.default};
    `,
  );
};
