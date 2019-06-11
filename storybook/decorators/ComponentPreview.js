import React from 'react';
import { css } from '@leafygreen-ui/emotion';

const rootStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  min-height: 100vh;
`;

// eslint-disable-next-line react/display-name
export default storyFn => <div className={rootStyle}>{storyFn()}</div>;
