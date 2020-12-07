import React from 'react';
import { useRouter } from 'next/router';
import { css } from 'emotion';
import Button from '@leafygreen-ui/button';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { uiColors } from '@leafygreen-ui/palette';
import { Tabs, Tab } from '@leafygreen-ui/tabs';
import { breakpoints } from '@leafygreen-ui/tokens';
import { H1 } from '@leafygreen-ui/typography';
import ReactIcon from 'components/svgs/ReactIcon';
import FigmaIcon from 'components/svgs/FigmaIcon';

const componentsStyle = css`
  height: 16px;
  color: ${uiColors.gray.dark1};
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 16px;
  text-transform: uppercase;
  font-weight: bold;
`;

const marginBottom = css`
  margin-bottom: 24px;
`;

const flexContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const h1Style = css`
  text-transform: capitalize;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: 0px;
  font-weight: bolder;
`;

const componentGuidelineStyles = css`
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
    <div role="main">
      <div className={marginBottom}>
        <small className={componentsStyle}>Components</small>
        <div className={flexContainer}>
          <H1 className={h1Style}>{componentName.split('-').join(' ')}</H1>

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
