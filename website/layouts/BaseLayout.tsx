import React from 'react';
import facepaint from 'facepaint';
import { css } from 'emotion';
import { spacing, breakpoints } from '@leafygreen-ui/tokens';

import Navigation from 'components/navigation';
import Footer from './Footer';

const mq = facepaint(
  Object.values(breakpoints).map(bp => `@media (min-width: ${bp}px)`),
  { literal: true },
);

const containerStyle = css`
  margin-top: ${spacing[4]}px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  ${mq({
    flexDirection: ['column', 'column', 'row'],
    paddingLeft: [`${spacing[4]}px`, `${spacing[4]}px`, '0px'],
    paddingRight: [`${spacing[4]}px`, `${spacing[4]}px`, '0px'],
  })}
`;

const topMargin = css`
  margin-top: 36px;
  ${mq({
    width: ['100%', '100%', '700px', '700px'],
  })}
`;

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <div className={containerStyle}>
        <Navigation />

        <div className={topMargin}>{children}</div>
      </div>

      <Footer />
    </div>
  );
}
