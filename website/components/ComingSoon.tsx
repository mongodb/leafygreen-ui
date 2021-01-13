import React from 'react';
import { css } from 'emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Subtitle } from '@leafygreen-ui/typography';
import { spacing } from '@leafygreen-ui/tokens';

const containerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const subtitleStyle = css`
  text-align: center;
  font-weight: bolder;
  margin-top: ${spacing[6]}px;
  margin-bottom: ${spacing[4]}px;
  color: ${uiColors.gray.dark3};
`;

function ComingSoon() {
  return (
    <div className={containerStyle}>
      <Subtitle as="p" className={subtitleStyle}>
        Coming soon!
      </Subtitle>
      <img
        src={`${process.env.NEXT_PUBLIC_CDN}/images/guidelines/coming-soon.gif`}
        height="450"
        width="700"
        alt=""
        aria-hidden
      />
    </div>
  );
}

ComingSoon.displayName = 'ComingSoon';

export default ComingSoon;
