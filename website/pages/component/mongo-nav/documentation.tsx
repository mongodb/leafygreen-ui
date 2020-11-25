import React from 'react';
import { GetStaticProps } from 'next';
import CodeDocs from 'components/CodeDocs';
import { BaseLayoutProps } from 'utils/types';
import { getStaticProps as getComponentResources } from 'pages/_getComponentResources'

export default function Documentation({ changelog, readme }: BaseLayoutProps) {
  return <CodeDocs component="mongo-nav" changelog={changelog} readme={readme} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const props = getComponentResources('mongo-nav')
  return props
}
