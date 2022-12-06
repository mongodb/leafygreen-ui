import React from 'react';
import { GetStaticProps } from 'next';
import { getStaticProps as getComponentResources } from 'pages/_getComponentResources';
import { BaseLayoutProps } from 'utils/types';

import CodeDocs from 'components/CodeDocs';

export default function Documentation({ changelog, readme }: BaseLayoutProps) {
  return (
    <CodeDocs
      component="segmented-control"
      changelog={changelog}
      readme={readme}
    />
  );
}

export const getStaticProps: GetStaticProps = () => {
  const props = getComponentResources('segmented-control');
  return props;
};
