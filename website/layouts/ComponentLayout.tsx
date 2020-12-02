import React from 'react';
import { useRouter } from 'next/router';
import { css } from 'emotion';
import Button from '@leafygreen-ui/button';
import DownloadIcon from '@leafygreen-ui/icon/dist/Download';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { uiColors } from '@leafygreen-ui/palette';
import { Tabs, Tab } from '@leafygreen-ui/tabs';
import { breakpoints } from '@leafygreen-ui/tokens';
import { H2 } from '@leafygreen-ui/typography';

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

const caps = css`
  text-transform: capitalize;
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
    <div>
      <div className={marginBottom}>
        <small className={componentsStyle}>Components</small>
        <div className={flexContainer}>
          <H2 className={caps}>{componentName.split('-').join(' ')}</H2>

          {!isMobile && (
            <Button glyph={<DownloadIcon />} variant="primary">
              View on Figma
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
          <div
            className={css`
              color: ${uiColors.gray.dark3};
              & > p {
                font-size: 16px;
                line-height: 24px;
              }
            `}
          >
            {children}
          </div>
        </Tab>
        <Tab
          name="Code Docs"
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
