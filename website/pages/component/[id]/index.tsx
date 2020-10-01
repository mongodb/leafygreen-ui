import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import Layout from '../../../components/layout';
import markdownToHtml from '../../../utils/markdownToHtml';

export default function Component({ component, changelog, readme }) {
  return <Layout component={component} changelog={changelog} readme={readme} />;
}

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  const changelogMarkdown = fs.readFileSync(
    path.join('../packages', id, 'changelog.md'),
  );

  const readme = fs
    .readFileSync(path.join('../packages', id, 'README.md'))
    .toString();

  const changelog = await markdownToHtml(changelogMarkdown || '');

  return {
    props: {
      changelog,
      readme,
      component: id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const packages = fs.readdirSync('../packages');

  const paths = packages.map(packageName => ({
    params: {
      id: packageName,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
