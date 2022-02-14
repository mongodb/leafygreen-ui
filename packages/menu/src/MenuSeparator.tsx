import * as React from 'react';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

const borderStyle = css`
  border-top: 1px solid ${palette.gray.dark2};
`;

function MenuSeparator() {
  return <li role="separator" className={borderStyle} />;
}

MenuSeparator.displayName = 'MenuSeparator';

export default MenuSeparator;
