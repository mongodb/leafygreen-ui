import React from 'react';
import { css } from 'react-emotion';

const rootStyle = css`
  display: flex;
  border: 1px solid #90C566;
  margin: 10px;
  padding: 10px;

  & > div {
    width: 100%;
  }
`

export default (storyFn) => <div className={rootStyle}>{storyFn()}</div>;
