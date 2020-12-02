import React from 'react';
import { css } from 'emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Body } from '@leafygreen-ui/typography';
import { spacing } from '@leafygreen-ui/tokens';

const containerStyle = css`
  width: 100%;
`;

const bodyStyle = css`
  text-align: center;
  font-style: italic;
  margin-top: ${spacing[6]}px;
  color: ${uiColors.gray.dark1};
`;

function ComingSoon() {
  return (
    <div className={containerStyle}>
      <Body className={bodyStyle}>Coming soon...</Body>
    </div>
  );
}

ComingSoon.displayName = 'ComingSoon';

export default ComingSoon;
