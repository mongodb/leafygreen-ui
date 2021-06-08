import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { css } from 'emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { mq } from 'utils/mediaQuery';

function toTitleCase(component: string) {
  return component
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    .join(' ');
}

const layout = css`
  ${mq({
    // 51px is a magic number for baseline alignment with the first SideNavGroup header
    marginTop: [`${spacing[4]}px`, `${spacing[4]}px`, '72px'],
    maxWidth: ['100%', '100%', '700px', '700px'],
  })}
`;

function FoundationLayout({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const foundationName = router.pathname
    .split('/')
    .filter(subStr => !!subStr)[1];

  const pageTitle = `${toTitleCase(
    foundationName,
  )} – LeafyGreen Design System | MongoDB`;

  return (
    <div role="main" className={layout}>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div>{children}</div>
    </div>
  );
}

FoundationLayout.displayName = 'FoundationLayout';

export default FoundationLayout;
