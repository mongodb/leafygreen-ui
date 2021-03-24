import React, { useState } from 'react';
import { css } from 'emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { uiColors } from '@leafygreen-ui/palette';
import Navigation from 'components/navigation';
import {LayoutContext} from 'components/LayoutContext';
import { mq } from 'utils/mediaQuery';
import Footer from './Footer';

const containerStyle = css`
  width: 100%;
  background-color: ${uiColors.white};
  grid-template-columns: auto 1fr;
  overflow: hidden;

  ${mq({
    height: ['auto', 'auto', '100vh'],
    display: ['block', 'block', 'grid'],
    paddingLeft: [`${spacing[4]}px`, `${spacing[4]}px`, '0px'],
    paddingRight: [`${spacing[4]}px`, `${spacing[4]}px`, '0px'],
  })}
`;

const layout = css`
  ${mq({
    overflowX: ['visible', 'visible', 'hidden'],
    overflowY: ['visible', 'visible', 'auto'],
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
  const [bodyContainerRef, setBodyContainerRef] = useState<HTMLDivElement | null>(null);

  return (
    <LayoutContext.Provider value={bodyContainerRef}>
      <div className={containerStyle}>
        <Navigation />

        <div className={layout} ref={el => setBodyContainerRef(el)}>
          <div className={childrenWrapper}>{children}</div>

          <Footer />
        </div>
      </div>
    </LayoutContext.Provider>
  );
}

BaseLayout.displayName = 'BaseLayout';

export default BaseLayout;
