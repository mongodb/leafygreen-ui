import React from 'react';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

const underline = css`
  background-repeat: repeat-x;
  background-position: 0 calc(1em + 4px);
  background-size: 3px 2px;

  background-image: radial-gradient(
    circle closest-side,
    ${uiColors.gray.dark1} 75%,
    transparent 25%
  );
`;

export default function InlineDefinition({ children }) {
  return (
    <div
      className={css`
        line-height: 20px;
        font-size: 14px;
      `}
    >
      <div className={underline}>{children}</div>
    </div>
  );
}
