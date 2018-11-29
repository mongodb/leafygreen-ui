import React from 'react';
import { css } from 'react-emotion';

const rootStyle = css`
  display: flex;
  border: 1px solid #90c566;
  margin: 10px;
  padding: 10px;

  & > div {
    width: 100%;
  }
`;

// eslint-disable-next-line react/display-name
export default storyFn => <div className={rootStyle}>{storyFn()}</div>;
