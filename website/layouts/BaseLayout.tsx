import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { spacing } from '@leafygreen-ui/tokens';
import { uiColors } from '@leafygreen-ui/palette';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import Navigation from 'components/navigation';
import { LayoutContext } from 'components/LayoutContext';
import { mq } from 'utils/mediaQuery';
import Footer from './Footer';
import { useRouter } from 'next/router';

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
  position: relative;
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
  const router = useRouter();
  const [bodyContainerRef, setBodyContainerRef] =
    useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = () => {
      if (bodyContainerRef) {
        bodyContainerRef.scroll(0, 0);
      }
    };
    router.events.on('routeChangeComplete', handler);
    return () => {
      router.events.off('routeChangeComplete', handler);
    };
  });

  return (
    <LeafyGreenProvider
      baseFontSize={16}
      popoverPortalContainer={{
        scrollContainer: bodyContainerRef,
        portalContainer: bodyContainerRef,
      }}
    >
      <LayoutContext.Provider value={bodyContainerRef}>
        <div className={containerStyle}>
          <Navigation />

          <div className={layout} ref={setBodyContainerRef}>
            <div className={childrenWrapper}>{children}</div>

            <Footer />
          </div>
        </div>
      </LayoutContext.Provider>
    </LeafyGreenProvider>
  );
}

BaseLayout.displayName = 'BaseLayout';

export default BaseLayout;
