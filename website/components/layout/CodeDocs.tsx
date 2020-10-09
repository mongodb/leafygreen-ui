import React, { useState } from 'react';
import { css, cx } from 'emotion';
import ActivityFeedIcon from '@leafygreen-ui/icon/dist/ActivityFeed';
import Button from '@leafygreen-ui/button';
import Card from '@leafygreen-ui/card';
import Code from '@leafygreen-ui/code';
import Modal from '@leafygreen-ui/modal';
import {
  Table,
  Row,
  TableHeader,
  Cell,
  TableHead,
  TableBody,
} from '@leafygreen-ui/table';
import { Tabs, Tab } from '@leafygreen-ui/tabs';
import { Subtitle, Body } from '@leafygreen-ui/typography';
import { spacing } from '@leafygreen-ui/tokens';
import { BaseLayoutProps } from 'utils/types';
import { GridContainer, GridItem } from 'components/grid/Grid';
import unified from 'unified';
import markdown from 'remark-parse';

const gridContainerStyle = css`
  width: 100%;
`;

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

const map = {
  [0]: 'prop',
  [1]: 'type',
  [2]: 'description',
  [3]: 'default',
};

// (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// 0: {type: "tableRow", children: Array(4), position: Position}

function getTableData(
  table: string,
): Array<{ prop: string; type: string; description: string; default: string }> {
  const tree = unified().use(markdown).parse(table);
  const rows = tree.children[0].children;
  const rowMap = rows.map(row => {
    const rowObj = {};
    row.children.map((cell, index) => {
      rowObj[map[index]] = cell.children[0]?.value || '-';
    });
    return rowObj;
  });

  rowMap.shift();
  return rowMap;
}

function CodeDocs({ component, readme, changelog }: BaseLayoutProps) {
  const [openModal, setOpenModal] = useState(false);
  const version = changelog.match(/(?<=<h2>)(.+?)(?=<\/h2>)/s)?.[1];
  const example = readme.match(/(?<=js).*?(?=```)/s)?.[0];
  const outputHTML = readme.match(/(?<=html).*?(?=```)/s)?.[0];
  const table = readme.match(/(?<=Properties).*?(?=_)/s)?.[0];

  const tableData = getTableData(table);

  return (
    <>
      <GridContainer
        justify="flex-start"
        align="flex-start"
        className={gridContainerStyle}
      >
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
      <GridContainer>
        <GridItem md={12} xl={12}>
          <Table
            data={tableData}
            columns={
              <>
                <TableHeader dataType="string" label="Prop" key="prop" />
                <TableHeader dataType="string" label="Type" key="type" />
                <TableHeader
                  dataType="string"
                  label="Description"
                  key="description"
                />
                <TableHeader dataType="string" label="Default" key="deafult" />
              </>
            }
          >
            {({ datum }) => (
              <Row key={datum.prop}>
                <Cell>{datum.prop}</Cell>
                <Cell>{datum.type}</Cell>
                <Cell>{datum.description}</Cell>
                <Cell>{datum.default}</Cell>
              </Row>
            )}
          </Table>
        </GridItem>
      </GridContainer>
    </>
  );
}

export default CodeDocs;
