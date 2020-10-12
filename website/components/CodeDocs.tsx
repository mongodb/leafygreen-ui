import React, { useState } from 'react';
import { css, cx } from 'emotion';
import ActivityFeedIcon from '@leafygreen-ui/icon/dist/ActivityFeed';
import Button from '@leafygreen-ui/button';
import Card from '@leafygreen-ui/card';
import Code from '@leafygreen-ui/code';
import Modal from '@leafygreen-ui/modal';
import { Tabs, Tab } from '@leafygreen-ui/tabs';
import { Subtitle, Body } from '@leafygreen-ui/typography';
import { spacing } from '@leafygreen-ui/tokens';
import { BaseLayoutProps } from 'utils/types';
import { GridContainer, GridItem } from 'components/Grid';
import PropTable from 'components/PropTable';
import unified from 'unified';
import markdown from 'remark-parse';

const topAlignment = css`
  margin-top: ${spacing[4]}px;
  padding-top: ${spacing[3]}px;
`;

const versionCard = css`
  height: 106px;
  padding-left: ${spacing[4]}px;
`;

const subtitlePadding = css`
  padding-bottom: ${spacing[3]}px;
`;

const tabsPadding = css`
  padding-top: ${spacing[2]}px;
`;

const tabMargin = css`
  margin-top: ${spacing[3]}px;
`;

function CodeDocs({ component, readme, changelog }: BaseLayoutProps) {
  const [openModal, setOpenModal] = useState(false);
  const version = changelog.match(/(?<=<h2>)(.+?)(?=<\/h2>)/s)?.[1];
  const example = readme.match(/(?<=js).*?(?=```)/s)?.[0];
  const outputHTML = readme.match(/(?<=html).*?(?=```)/s)?.[0];

  const mdAst = unified().use(markdown).parse(readme);

  return (
    <>
      <GridContainer justify="flex-start" align="flex-start">
        <GridItem lg={7}>
          <div className={topAlignment}>
            <Subtitle>Installation</Subtitle>
            <Body weight="medium">Yarn</Body>
            <Code language="js">{`yarn add @leafygreen-ui/${component}`}</Code>
          </div>
        </GridItem>
        <GridItem lg={5}>
          <Card className={cx(topAlignment, versionCard)}>
            <Subtitle className={subtitlePadding}>Version {version}</Subtitle>
            <Button
              glyph={<ActivityFeedIcon />}
              onClick={() => setOpenModal(curr => !curr)}
            >
              View Changelog
            </Button>
            <Modal open={openModal} setOpen={setOpenModal}>
              <div dangerouslySetInnerHTML={{ __html: changelog }}></div>
            </Modal>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer align="flex-start" justify="flex-start">
        <GridItem lg={7}>
          <Body weight="medium">NPM</Body>
          <Code language="js">{`npm install @leafygreen-ui/${component}`}</Code>
        </GridItem>
      </GridContainer>
      <GridContainer align="flex-start" justify="flex-start">
        <GridItem xl={12}>
          <Tabs className={tabsPadding}>
            <Tab default name="Example" className={tabMargin}>
              <Code language="js">{example}</Code>
            </Tab>
            <Tab name="Output HTML" className={tabMargin}>
              <Code language="xml">{outputHTML}</Code>
            </Tab>
          </Tabs>
        </GridItem>
      </GridContainer>
      <GridContainer align="flex-start" justify="flex-start">
        <GridItem xl={12}>
          <PropTable mdAst={mdAst} />
        </GridItem>
      </GridContainer>
    </>
  );
}

export default CodeDocs;
