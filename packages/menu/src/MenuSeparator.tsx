import * as React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

const borderStyle = css`
  border-top: 1px solid ${palette.gray.dark2};
`;

function MenuSeparator({
  margin = 0,
}: {
  /**
   * Vertical margin fo the separator
   */
  margin?: number;
}) {
  return (
    <li
      role="separator"
      className={cx(
        borderStyle,
        css`
          margin: ${margin}px 0;
        `,
      )}
    />
  );
}

MenuSeparator.displayName = 'MenuSeparator';

export default MenuSeparator;
