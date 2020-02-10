import * as React from 'react';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

const borderStyle = css`
  border-top: 1px solid ${uiColors.gray.light2};
`;

function MenuSeparator() {
  return <li role="separator" className={borderStyle} />;
}

MenuSeparator.displayName = 'MenuSeparator';

export default MenuSeparator;
