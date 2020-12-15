import React from 'react';
import { useRouter } from 'next/router';
import facepaint from 'facepaint';
import { css } from 'emotion';
import Button from '@leafygreen-ui/button';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { uiColors } from '@leafygreen-ui/palette';
import { Tabs, Tab } from '@leafygreen-ui/tabs';
import { spacing, breakpoints } from '@leafygreen-ui/tokens';
import { H2 } from '@leafygreen-ui/typography';
import ReactIcon from 'components/svgs/ReactIcon';
import FigmaIcon from 'components/svgs/FigmaIcon';

const mq = facepaint(
  Object.values(breakpoints).map(bp => `@media (min-width: ${bp}px)`),
  { literal: true },
);

const layout = css`
  margin-top: 72px;

  ${mq({
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
  margin-top: ${spacing[4]}px;
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
  & > p {
    font-size: 16px;
    line-height: 24px;
  }
`;

const codeDocsWrapper = css`
  display: flex;
  align-items: center;
`;

const reactIconStyle = css`
  margin-right: 4px;
`;

export default function ComponentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <div className={margin4}>
        <small className={componentsStyle}>Components</small>
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
      <Tabs selected={selected} setSelected={setSelected}>
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
