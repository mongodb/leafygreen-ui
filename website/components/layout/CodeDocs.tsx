import React from 'react';
import ActivityFeedIcon from '@leafygreen-ui/icon/dist/ActivityFeed';
import Button from '@leafygreen-ui/button';
import Code from '@leafygreen-ui/code';
import Card from '@leafygreen-ui/card';
import Modal from '@leafygreen-ui/modal';
import { css } from 'emotion';
import { Tabs, Tab } from '@leafygreen-ui/tabs';
import { Table, TableHeader } from '@leafygreen-ui/table';
import { Body, Subtitle } from '@leafygreen-ui/typography';
import { GridContainer, GridItem } from '../grid/Grid';

const topContainer = css`
  display: flex;
  align-items: flex-start;
`;

const installationContainer = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const installMargin = css`
  margin-bottom: 36px;
`;

const subtitleStyle = css`
  margin-top: 36px;
  margin-bottom: 12px;
`;

const versionCard = css`
  height: 106px;
  width: 286px;
  padding: 16px 0 20px 24px;
  margin-left: 28px;
  margin-top: 24px;
`;

const buttonMargin = css`
  margin-top: 16px;
`;

function CodeDocs({
  component,
  changelog,
  readme,
}: {
  component: string;
  changelog: string;
  readme: string;
}) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const version = changelog.match(/<h2>([\s\S]*?)<\/h2>/m)[1];
  const example = readme.match(/Javascript([\s\S]*?)```/m)?.[1];
  const html = readme.match(/```HTML([\s\S]*?)```/m)?.[1];

  console.log(readme);

  return (
    <>
      <div className={topContainer}>
        <div className={installationContainer}>
          <div className={installMargin}>
            <Subtitle className={subtitleStyle}>Installation</Subtitle>
            <Body weight="medium">Yarn</Body>
            <Code language="js">{`yarn add @leafygreen-ui/${component}`}</Code>
          </div>
          <div>
            <div>
              <Body weight="medium">NPM</Body>
              <Code language="js">{`npm install @leafygreen-ui/${component}`}</Code>
            </div>
          </div>
        </div>

        <Card className={versionCard}>
          <Subtitle>Version {version}</Subtitle>
          <Button
            className={buttonMargin}
            glyph={<ActivityFeedIcon />}
            onClick={() => setModalOpen(curr => !curr)}
          >
            View Changelog
          </Button>
          <Modal open={modalOpen} setOpen={setModalOpen}>
            {<div dangerouslySetInnerHTML={{ __html: changelog }}></div>}
          </Modal>
        </Card>
      </div>

      <Tabs
        className={css`
          margin-top: 20px;
        `}
      >
        <Tab name="Example" default>
          <div
            className={css`
              margin-top: 20px;
            `}
          >
            <Code language="js">{example}</Code>
          </div>
        </Tab>
        <Tab name="OutputHTML">
          <div
            className={css`
              margin-top: 20px;
            `}
          >
            <Code language="js">{html}</Code>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}

CodeDocs.displayName = 'CodeDocs';

export default CodeDocs;
