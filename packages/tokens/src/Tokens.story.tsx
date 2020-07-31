import React from 'react';
import { storiesOf } from '@storybook/react';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '.';

const gutter = css`
  margin-left: ${spacing[3]};
`;

const spacing1 = css`
  background-color: #fb4949;
  padding: ${spacing[1]};
`;

const spacing2 = css`
  background-color: #497ffb;
  padding: ${spacing[2]};
`;

const spacing3 = css`
  background-color: #62e3fd;
  padding: ${spacing[3]};
`;
const spacing4 = css`
  background-color: #52c825;
  padding: ${spacing[4]};
`;
const spacing5 = css`
  background-color: #fdd063;
  padding: ${spacing[5]};
`;
const spacing6 = css`
  background-color: #fd7fec;
  padding: ${spacing[6]};
`;
const spacing7 = css`
  background-color: #a5fd8b;
  padding: ${spacing[7]};
`;

storiesOf('Tokens', module).add('Spacing', () => (
  <>
    <div className={cx(spacing1, gutter)}>{spacing[1]}</div>
    <div className={cx(spacing2, gutter)}>{spacing[2]}</div>
    <div className={cx(spacing3, gutter)}>{spacing[3]}</div>
    <div className={cx(spacing4, gutter)}>{spacing[4]}</div>
    <div className={cx(spacing5, gutter)}>{spacing[5]}</div>
    <div className={cx(spacing6, gutter)}>{spacing[6]}</div>
    <div className={cx(spacing7, gutter)}>{spacing[7]}</div>
  </>
));
