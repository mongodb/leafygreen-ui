import React from 'react';
import { css } from 'emotion';
import { Body } from '@leafygreen-ui/typography';
import { spacing } from '@leafygreen-ui/tokens';

function ComingSoon() {
  return (
    <div
      className={css`
        width: 100%;
      `}
    >
      <Body
        className={css`
          text-align: center;
          font-style: italic;
          margin-top: ${spacing[4]}px;
        `}
      >
        Coming soon...
      </Body>
    </div>
  );
}

ComingSoon.displayName = 'ComingSoon';

export default ComingSoon;
