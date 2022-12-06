import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { pageContainerWidth } from 'styles/constants';
import componentData from 'utils/componentData';
import { mq } from 'utils/mediaQuery';
import metaTagKey from 'utils/metaTagKey';
import { Component } from 'utils/types';

import FigmaIcon from 'components/svgs/FigmaIcon';
import ReactIcon from 'components/svgs/ReactIcon';

import Button from '@leafygreen-ui/button';
import { useViewportSize } from '@leafygreen-ui/hooks';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { uiColors } from '@leafygreen-ui/palette';
import { Tab,Tabs } from '@leafygreen-ui/tabs';
import { breakpoints,spacing } from '@leafygreen-ui/tokens';
import { H2 } from '@leafygreen-ui/typography';

import { css } from '@emotion/css';

const layout = css`
  ${mq({
    // 51px is a magic number for baseline alignment with the first SideNavGroup header
    marginTop: [`${spacing[4]}px`, `${spacing[4]}px`, '51px'],
    width: ['100%', '100%', '100%', `${pageContainerWidth.dataGraphic}px`],
  })}
`;

const componentsStyle = css`
  height: 16px;
  color: ${uiColors.gray.dark1};
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 16px;
  text-transform: uppercase;
  font-weight: bold;
`;

const margin4 = css`
  margin-bottom: ${spacing[4]}px;
`;

const flexContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const caps = css`
  text-transform: capitalize;
`;

const componentGuidelineStyles = css`
  overflow-wrap: anywhere;
  color: ${uiColors.gray.dark3};
  margin: ${spacing[4]}px 0px;
  max-width: ${pageContainerWidth.default}px;

  & > p {
    font-size: 16px;
    line-height: 24px;
  }
`;

const codeDocsWrapper = css`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const reactIconStyle = css`
  margin-right: 4px;
`;

function toTitleCase(component: string) {
  return component
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    .join(' ');
}

function ComponentLayout({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = React.useState(0);
  const router = useRouter();
  const componentName = router.pathname
    .split('/')
    .filter(subStr => !!subStr)[1] as Component;

  React.useEffect(() => {
    const activeRoute = router.pathname
      .split('/')
      .filter(subStr => !!subStr)[2];
    setSelected(
      activeRoute === 'example' ? 0 : activeRoute === 'guidelines' ? 1 : 2,
    );
  }, [router]);

  const viewport = useViewportSize();
  const isMobile =
    viewport !== null ? viewport.width < breakpoints.Tablet : false;

  const pageTitle = `${toTitleCase(
    componentName,
  )} – LeafyGreen Design System | MongoDB`;

  const { figmaLink, metaTagDescription } = componentData[componentName] ?? {};

  return (
    <div role="main" className={layout}>
      <Head>
        <title>{pageTitle}</title>

        <meta property="og:title" content={pageTitle} key={metaTagKey.Title} />
        {metaTagDescription && (
          <meta
            property="og:description"
            content={metaTagDescription}
            key={metaTagKey.Description}
          />
        )}
      </Head>

      <div className={margin4}>
        {/* Intentionally left blank, as we want to preserve this space for when we */}
        {/* Have other sections on the SideNav and want to add back 'components' above */}
        {/* The name of each component */}
        <small className={componentsStyle}>‎‎‎‎‏‏‎ </small>
        <div className={flexContainer}>
          <H2 as="h1" className={caps}>
            {componentName.split('-').join(' ')}
          </H2>

          {!isMobile && figmaLink && (
            <Button
              leftGlyph={<FigmaIcon />}
              variant="primary"
              href={figmaLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Figma
            </Button>
          )}
        </div>
      </div>
      <Tabs
        selected={selected}
        setSelected={setSelected}
        aria-label={`Information on LeafyGreen UI ${componentName
          .split('-')
          .join(' ')} component`}
      >
        <Tab
          name="Live Example"
          onClick={() => router.push(`/component/${componentName}/example`)}
        >
          {children}
        </Tab>
        <Tab
          name="Design Guidelines"
          onClick={() => router.push(`/component/${componentName}/guidelines`)}
        >
          <LeafyGreenProvider baseFontSize={16}>
            <div className={componentGuidelineStyles}>{children}</div>
          </LeafyGreenProvider>
        </Tab>
        <Tab
          name={
            <div className={codeDocsWrapper}>
              <ReactIcon className={reactIconStyle} />
              Code Docs
            </div>
          }
          onClick={() =>
            router.push(`/component/${componentName}/documentation`)
          }
        >
          {children}
        </Tab>
      </Tabs>
    </div>
  );
}

ComponentLayout.displayName = 'ComponentLayout';

export default ComponentLayout;
