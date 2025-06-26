import React from 'react';

import { css } from '@leafygreen-ui/emotion';
import { color } from '@leafygreen-ui/tokens';

/**
 * Renders an error message, and logs an error
 */
export function Err(msg: string): JSX.Element {
  console.error(msg);
  return (
    <div
      className={css`
        background-color: ${color.light.background.error.default};
        color: ${color.light.text.error.default};
        margin: 24px;
      `}
    >
      {msg}
    </div>
  );
}
