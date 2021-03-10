import React from 'react';
import { css } from 'emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { uiColors } from '@leafygreen-ui/palette';
import Navigation from 'components/navigation';
import { mq } from 'utils/mediaQuery';
import Footer from './Footer';

const containerStyle = css`
  width: 100%;
  height: 100vh;
  background-color: ${uiColors.white};
  grid-template-columns: auto 1fr;

  ${mq({
    display: ['block', 'block', 'grid', 'grid'],
    paddingLeft: [`${spacing[4]}px`, `${spacing[4]}px`, '0px', '0px'],
    paddingRight: [`${spacing[4]}px`, `${spacing[4]}px`, '0px', '0px'],
  })}
`;

const layout = css`
  ${mq({
    overflowX: ['visible', 'visible', 'hidden', 'hidden'],
    overflowY: ['visible', 'visible', 'auto', 'auto'],
  })}
`;

const padding = `${spacing[5]}px`;

const childrenWrapper = css`
  min-height: 100vh;

  ${mq({
    paddingLeft: [0, 0, padding, padding],
    paddingRight: [0, 0, padding, padding],
    width: [
      '100%',
      '100%',
      `calc(100% - (${padding} * 2))', 'calc(1440px - 270px - (${padding} * 2))`,
    ],
  })}
`;

function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={containerStyle}>
      <Navigation />

      <div className={layout}>
        <div className={childrenWrapper}>{children}</div>

        <Footer />
      </div>
    </div>
  );
}

BaseLayout.displayName = 'BaseLayout';

export default BaseLayout;
