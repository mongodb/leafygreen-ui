import * as React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

const borderStyle = css`
  border-top: 1px solid ${palette.gray.dark2};
`;

function MenuSeparator({ className }: { className?: string }) {
  return <li role="separator" className={cx(borderStyle, className)} />;
}

MenuSeparator.displayName = 'MenuSeparator';

export default MenuSeparator;
