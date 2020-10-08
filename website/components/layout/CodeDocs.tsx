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
import markdownToHtml from 'utils/markdownToHtml';

import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';

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

async function getTableData(table) {
  // const rows = html.match(/(?<=<tbody>).*?(?=<\/tbody)/s)?.[0];
  const tableData = unified().use(parse).process(table);

  console.log(tableData);
  // const data = []
  // const parseRows = rows.split("tr").map(row => )

  // console.log(rows.split('<tr>'));
  // const body = html.slice('body');
  // console.log(body.join(''));

  // const data = [{ prop: 'xx', type: 'xx', description: 'xx', default: 'xxx' }];
}

function CodeDocs({ component, readme, changelog }: BaseLayoutProps) {
  const [openModal, setOpenModal] = useState(false);
  const version = changelog.match(/(?<=<h2>)(.+?)(?=<\/h2>)/s)?.[1];
  const example = readme.match(/(?<=js).*?(?=```)/s)?.[0];
  const outputHTML = readme.match(/(?<=html).*?(?=```)/s)?.[0];
  const table = readme.match(/(?<=Properties).*?(?=_)/s)?.[0];

  console.log(getTableData(table));

  const RenderedTable = ({ children }) => {
    return (
      <Table
        data={tableData}
        columns={[
          <TableHeader dataType="string" label="Prop" key="prop" />,
          <TableHeader dataType="string" label="Type" key="type" />,
          <TableHeader
            dataType="string"
            label="Description"
            key="description"
          />,
          <TableHeader dataType="string" label="Default" key="default" />,
        ]}
      >
        {({
          datum,
        }: {
          datum: {
            prop: string;
            type: string;
            description: string;
            default: string;
          };
        }) => (
          <Row key={datum.prop}>
            <Cell>{datum.prop}</Cell>
            <Cell>{datum.type}</Cell>
            <Cell>{datum.description}</Cell>
            <Cell>{datum.default}</Cell>
          </Row>
        )}
      </Table>
    );
  };

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
        <GridItem xl={12}>
          {/* {tableData} */}
          {/* <Table
            data={tableData}
            columns={[
              <TableHeader dataType="string" label="Prop" key="prop" />,
              <TableHeader dataType="string" label="Type" key="type" />,
              <TableHeader
                dataType="string"
                label="Description"
                key="description"
              />,
              <TableHeader dataType="string" label="Default" key="default" />,
            ]}
          >
            {({
              datum,
            }: {
              datum: {
                prop: string;
                type: string;
                description: string;
                default: string;
              };
            }) => (
              <Row key={datum.prop}>
                <Cell>{datum.prop}</Cell>
                <Cell>{datum.type}</Cell>
                <Cell>{datum.description}</Cell>
                <Cell>{datum.default}</Cell>
              </Row>
            )}
          </Table> */}
        </GridItem>
      </GridContainer>
    </>
  );
}

export default CodeDocs;
