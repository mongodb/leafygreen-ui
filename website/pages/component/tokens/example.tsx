import React from 'react';
import { css } from '@emotion/css';
import { spacing, fontFamilies } from '@leafygreen-ui/tokens';
import { Subtitle } from '@leafygreen-ui/typography';
import LiveExample from 'components/live-example';

const gutter = css`
  margin-right: ${spacing[3]}px;
`;

const textWrapper = css`
  margin-bottom: ${spacing[2]}px;
  font-size: 12px;
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
      <div className={textWrapper}>
        {`spacing[${space}]:`}
        <br />
        {`${spacing[space]}`}
      </div>
      <div className={spacingBlockVariants[space]}></div>
    </div>
  );
}

export default function TokensLiveExample() {
  return (
    <LiveExample knobsConfig={{}}>
      {() => (
        <div
          className={css`
            overflow-x: auto;
          `}
        >
          <Subtitle
            className={css`
              margin-bottom: ${spacing[2]}px;
            `}
          >
            Spacing
          </Subtitle>
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

          <Subtitle>Font Families</Subtitle>
          <div>
            <p
              className={css`
                font-family: ${fontFamilies.default};
                font-size: 14px;
              `}
            >
              Akzidenz, Helvetica Neue, Helvetica, Arial, sans-serif
            </p>
            <p
              className={css`
                font-family: ${fontFamilies.code};
                font-size: 14px;
              `}
            >
              Source Code Pro, Menlo, monospace
            </p>
          </div>
        </div>
      )}
    </LiveExample>
  );
}
