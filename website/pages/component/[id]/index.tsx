import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import facepaint from 'facepaint';
import fs from 'fs';
import path from 'path';
import util from 'util';
import { css } from 'emotion';
import { GridContainer, GridItem } from 'components/grid/Grid';
import Navigation from 'components/navigation/Navigation';
import Header from 'components/layout/Header';
import markdownToHtml from 'utils/markdownToHtml';
import { BaseLayoutProps } from 'utils/types';

const breakpoints = [320, 768, 1024, 1440];
const mq = facepaint(
  breakpoints.map(bp => `@media (min-width: ${bp}px)`),
  { literal: true },
);

const containerStyle = css`
  margin-top: 12px;
  display: flex;
  width: 100%;
  ${mq({
    flexDirection: ['column', 'row'],
    paddingLeft: ['24px', '0px'],
  })}
  align-items: flex-start;
`;

const topMargin = css`
  margin-top: 36px;
`;

export default function Component({
  component,
  changelog,
  readme,
}: BaseLayoutProps) {
  return (
    <div className={containerStyle}>
      <Navigation />

      <GridContainer justify="flex-start">
        <GridItem sm={12} md={10} lg={9}>
          <div className={topMargin}>
            <Header
              component={component}
              changelog={changelog}
              readme={readme}
            />
          </div>
        </GridItem>
      </GridContainer>
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
