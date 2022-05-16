import React from 'react';
import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import DarkModeWrapper from '../../stories/DarkModeWrapper';

const rootStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  min-height: 100vh;
`;

// eslint-disable-next-line react/display-name
export default (Story, options) => {
  const darkMode = options.args.darkMode;
  return (
    <LeafyGreenProvider>
      <div className={rootStyle}>
        <DarkModeWrapper darkMode={darkMode}>
          <Story darkMode={darkMode} {...options} />
        </DarkModeWrapper>
      </div>
    </LeafyGreenProvider>
  );
};
