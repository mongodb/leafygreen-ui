import React from 'react';
import { GetStaticProps } from 'next';
import { getStaticProps as getComponentResources } from 'pages/_getComponentResources';
import { BaseLayoutProps } from 'utils/types';

import CodeDocs from 'components/CodeDocs';

export default function Documentation({ changelog, readme }: BaseLayoutProps) {
  return (
    <CodeDocs
      component="confirmation-modal"
      changelog={changelog}
      readme={readme}
    />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const props = getComponentResources('confirmation-modal');
  return props;
};
