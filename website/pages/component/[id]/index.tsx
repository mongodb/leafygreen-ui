import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import facepaint from 'facepaint';
import fs from 'fs';
import path from 'path';
import util from 'util';
import { css } from 'emotion';
import { breakpoints } from '@leafygreen-ui/tokens';
import Navigation from 'components/navigation';
import Header from 'components/Header';
import markdownToHtml from 'utils/markdownToHtml';
import { BaseLayoutProps } from 'utils/types';

const mq = facepaint(
  Object.values(breakpoints).map(bp => `@media (min-width: ${bp}px)`),
  { literal: true },
);

const containerStyle = css`
  margin-top: 12px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  ${mq({
    flexDirection: ['column', 'column', 'row'],
    paddingLeft: ['24px', '24px', '0px'],
    paddingRight: ['24px', '24px', '0px'],
  })}
`;

const topMargin = css`
  margin-top: 36px;
  ${mq({
    width: ['100%', '100%', '700px', '700px'],
  })}
`;

export default function Component({
  component,
  changelog,
  readme,
}: BaseLayoutProps) {
  return (
    <div className={containerStyle}>
      <Navigation />

      <div className={topMargin}>
        <Header component={component} changelog={changelog} readme={readme} />
      </div>
    </div>
  );
}

const getFileContent = util.promisify(fs.readFile);
const getDirContent = util.promisify(fs.readdir);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params.id !== 'string') {
    return { props: {} };
  }

  const { id } = params;

  const props: Partial<BaseLayoutProps> = { component: id };

  const changelogMarkdown = await getFileContent(
    path.join('../packages', id, 'changelog.md'),
  );

  props.changelog = await markdownToHtml(changelogMarkdown);

  props.readme = await getFileContent(
    path.join('../packages', id, 'README.md'),
    'utf-8',
  );

  return {
    props,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const packages = await getDirContent('../packages');

  const paths = packages.map(folderName => ({
    params: {
      id: folderName,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
