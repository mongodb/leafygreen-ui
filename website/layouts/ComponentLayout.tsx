import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { css } from 'emotion';
import Button from '@leafygreen-ui/button';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { uiColors } from '@leafygreen-ui/palette';
import { Tabs, Tab } from '@leafygreen-ui/tabs';
import { spacing, breakpoints } from '@leafygreen-ui/tokens';
import { H2 } from '@leafygreen-ui/typography';
import ReactIcon from 'components/svgs/ReactIcon';
import FigmaIcon from 'components/svgs/FigmaIcon';
import { mq } from 'utils/mediaQuery';

const layout = css`
  ${mq({
    marginTop: [`${spacing[4]}px`, '70px'],
    width: ['100%', '100%', '700px', '700px'],
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
  padding-bottom: ${spacing[6]}px;

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
    .filter(subStr => !!subStr)[1];

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

  return (
    <div role="main" className={layout}>
      <Head>
        <title>
          {toTitleCase(componentName)} – LeafyGreen Design System | MongoDB
        </title>
      </Head>

      <div className={margin4}>
        {/* Intentionally left blank, as we want to preserve this space for when we */}
        {/* Have other sections on the SideNav and want to add back 'components' above */}
        {/* The name of each component */}
        <small className={componentsStyle}>‎‎‎‎‏‏‎ ‎</small>
        <div className={flexContainer}>
          <H2 as="h1" className={caps}>
            {componentName.split('-').join(' ')}
          </H2>

          {!isMobile && (
            <Button glyph={<FigmaIcon />} variant="primary">
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
          <div className={componentGuidelineStyles}>{children}</div>
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
