import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import { spacing } from '.';

const gutter = css`
  margin-left: ${spacing[3]}px;
`;

const textWrapper = css`
  margin-bottom: ${spacing[2]}px;
  font-size: 10px;
`;

const colors = [
  '#fb4949',
  '#497ffb',
  '#62e3fd',
  '#52c825',
  '#fdd063',
  '#fd7fec',
  '#a5fd8b',
];

const spacingBlockVariants = Object.keys(spacing).reduce(
  (acc: Partial<Record<keyof typeof spacing, string>>, index, idx) => {
    const key = index as PropertyKey as keyof typeof spacing;
    acc[key] = css`
      background-color: ${colors[idx]};
      width: ${spacing[key]}px;
      height: ${spacing[key]}px;
    `;
    return acc;
  },
  {},
);

function SpacingBlock({ space }: { space: keyof typeof spacing }) {
  return (
    <div className={gutter}>
      <div
        className={textWrapper}
      >{`spacing[${space}]: ${spacing[space]}`}</div>
      <div className={spacingBlockVariants[space]}></div>
    </div>
  );
}

storiesOf('Packages/Tokens', module).add('Spacing', () => (
  <div
    className={css`
      display: flex;
    `}
  >
    {Object.keys(spacing).map(space => (
      <SpacingBlock
        space={space as PropertyKey as keyof typeof spacing}
        key={space}
      />
    ))}
  </div>
));
