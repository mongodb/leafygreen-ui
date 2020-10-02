import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import { css } from 'emotion';
import { GridContainer, GridItem } from '../../../components/grid/Grid';
import Navigation from '../../../components/navigation/Navigation';
import Header from '../../../components/layout/Header';
import markdownToHtml from '../../../utils/markdownToHtml';
import { BaseLayoutProps } from '../../../utils/types';

const containerStyle = css`
  margin-top: 12px;
  display: flex;
  flex-direction: row;
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
  console.log(component, changelog, readme);
  return (
    <div className={containerStyle}>
      <Navigation />

      <GridContainer justify="flex-start">
        <GridItem md={6} lg={8}>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return { props: {} };
  }

  const { id } = params;

  let changelogMarkdown, readme;

  if (typeof id === 'string') {
    changelogMarkdown = fs.readFileSync(
      path.join('../packages', id, 'changelog.md'),
    );

    readme = fs
      .readFileSync(path.join('../packages', id, 'README.md'))
      .toString();
  }

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
