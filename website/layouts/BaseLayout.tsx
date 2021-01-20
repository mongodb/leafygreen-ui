import React from 'react';
import { css } from 'emotion';
import { spacing } from '@leafygreen-ui/tokens';
import Navigation from 'components/navigation';
import { mq } from 'utils/mediaQuery';
import Footer from './Footer';

const containerStyle = css`
  width: 100%;
  display: flex;
  align-items: flex-start;
  ${mq({
    flexDirection: ['column', 'column', 'row'],
    paddingLeft: [`${spacing[4]}px`, `${spacing[4]}px`, '0px'],
    paddingRight: [`${spacing[4]}px`, `${spacing[4]}px`, '0px'],
  })}
`;

const layout = css`
  ${mq({
    width: ['100%', '100%', 'calc(100% - 32px)', 'calc(1440px - 270px - 32px)'],
    marginRight: ['inherit', 'inherit', '32px'],
  })}
`;

function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div
        className={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <div className={containerStyle}>
          <Navigation />

          <div className={layout}>{children}</div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

BaseLayout.displayName = 'BaseLayout';

export default BaseLayout;
