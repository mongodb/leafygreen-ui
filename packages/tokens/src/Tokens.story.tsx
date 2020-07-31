import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import { spacing } from '.';

const gutter = css`
  margin-left: ${spacing[3]};
`;

const textWrapper = css`
  margin-bottom: ${spacing[2]};
  font-size: 10px;
`;

const spacingBlockVariants = {
  1: css`
    background-color: #fb4949;
    width: ${spacing[1]};
    height: ${spacing[1]};
  `,

  2: css`
    background-color: #497ffb;
    width: ${spacing[2]};
    height: ${spacing[2]};
  `,

  3: css`
    background-color: #62e3fd;
    width: ${spacing[3]};
    height: ${spacing[3]};
  `,

  4: css`
    background-color: #52c825;
    width: ${spacing[4]};
    height: ${spacing[4]};
  `,

  5: css`
    background-color: #fdd063;
    width: ${spacing[5]};
    height: ${spacing[5]};
  `,

  6: css`
    background-color: #fd7fec;
    width: ${spacing[6]};
    height: ${spacing[6]};
  `,

  7: css`
    background-color: #a5fd8b;
    width: ${spacing[7]};
    height: ${spacing[7]};
  `,
};

function SpacingBlock({ space }: { space: string }) {
  return (
    <div className={gutter}>
      <div
        className={textWrapper}
      >{`spacing[${space}]: ${spacing[space]}`}</div>
      <div className={spacingBlockVariants[space]}></div>
    </div>
  );
}

storiesOf('Tokens', module).add('Spacing', () => (
  <div
    className={css`
      display: flex;
    `}
  >
    {Object.keys(spacing).map(space => (
      <SpacingBlock space={space} key={space} />
    ))}
  </div>
));
