import React from 'react';
import { css } from '@emotion/css';
import Card from '@leafygreen-ui/card';
import { Table, TableHeader, Row, Cell } from '@leafygreen-ui/table';
import { Subtitle, InlineCode } from '@leafygreen-ui/typography';
import { OneOf } from '@leafygreen-ui/lib';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { breakpoints } from '@leafygreen-ui/tokens';
import PropDefinition from 'components/PropDefinition';
import TypographyPropTable from 'components/TypographyPropTable';
import formatType from 'utils/formatType';
import { mq } from 'utils/mediaQuery';
import { pageContainerWidth } from 'styles/constants';

const tableWrapper = css`
  ${mq({
    marginLeft: ['-24px', 'unset'],
    marginRight: ['-24px', 'unset'],
    overflow: ['hidden', 'unset'],
    width: [
      'inherit',
      'inherit',
      'inherit',
      `${pageContainerWidth.dataGraphic}px`,
    ],
  })}
`;

const subtitleBottomMargin = css`
  margin-bottom: 24px;
  ${mq({
    marginLeft: ['24px', 'unset'],
  })}
`;

const verticalAlign = css`
  vertical-align: top;
`;

const tableHeaderNames: Array<'prop' | 'type' | 'description' | 'default'> = [
  'prop',
  'type',
  'description',
  'default',
];

const HeadingType = {
  ComponentName: 'componentName',
  TypeDefinition: 'typeDefinition',
} as const;

type HeadingType = typeof HeadingType[keyof typeof HeadingType];

export { HeadingType };

export const readmeDepthMap = {
  [HeadingType.ComponentName]: 1,
  [HeadingType.TypeDefinition]: 5,
};

export interface ReadmeMarkdown {
  children: Array<Heading | Table>;
}

export interface Heading {
  type: 'heading';
  depth: typeof readmeDepthMap[keyof typeof readmeDepthMap];
  children: Array<{ value: string }>;
}

interface Table {
  type: 'table';
  children: Array<RowInterface>;
}

interface RowInterface {
  children: Array<CellRoot>;
}

export interface CellRoot {
  children: Array<CellChild>;
}

type CellChild = OneOf<
  {
    children: Array<CellLeaf>;
  },
  CellLeaf
>;

interface CellLeaf {
  children?: undefined;
  value: string;
  type: string;
  depth: number;
  url?: string;
}

interface TableDataInterface {
  prop: { value?: string; url?: string };
  type: { value?: string; url?: string };
  description: { value?: string; url?: string };
  default: { value?: string; url?: string };
}

function getTableData(rows: Table['children']): Array<TableDataInterface> {
  if (!rows) {
    return [];
  }

  const rowMap = rows.map(row => {
    const rowObj: Partial<TableDataInterface> = {};
    row.children.map((cell, index) => {
      if (cell.children?.[0]?.url) {
        rowObj[tableHeaderNames[index]] = { url: cell.children[0].url };
      }

      const value =
        cell.children
          .map(child => {
            if (child.children) {
              return child.children.map(child => child.value).join('');
            }

            return child.value;
          })
          .join('') || '-';

      rowObj[tableHeaderNames[index]] = {
        ...rowObj[tableHeaderNames[index]],
        value,
      };
    });

    return rowObj;
  });

  rowMap.shift();

  return rowMap as Array<TableDataInterface>;
}

function Wrapper({
  children,
  isTouchDevice,
}: {
  children: React.ReactNode;
  isTouchDevice: boolean;
}) {
  if (isTouchDevice) {
    return (
      <div
        className={css`
          margin-bottom: 56px;
        `}
      >
        {children}
      </div>
    );
  }

  return (
    <Card
      className={css`
        padding: 24px;
        margin-bottom: 56px;
      `}
    >
      {children}
    </Card>
  );
}

function PropTable({
  markdownAst,
  component,
}: {
  markdownAst: ReadmeMarkdown;
  component: string;
}) {
  const viewport = useViewportSize();

  const isTouchDevice =
    viewport !== null ? viewport.width < breakpoints.Tablet : false;

  const headers = markdownAst.children
    .filter(
      treeItem =>
        treeItem.type === 'heading' &&
        treeItem.depth === readmeDepthMap[HeadingType.ComponentName],
    )
    .map((item: Heading) => item?.children?.[0].value);

  let peerDepIndex: number | undefined;

  const tableData = markdownAst.children
    .filter((treeItem, index) => {
      if (
        treeItem.type === 'heading' &&
        treeItem.children?.[0].value === 'Peer Dependencies'
      ) {
        peerDepIndex = index;
      }

      return (
        !(typeof peerDepIndex === 'number' && peerDepIndex + 1 === index) &&
        treeItem.type === 'table'
      );
    })
    .map((item: Table) => getTableData(item.children));

  if (tableData.length === 0) {
    return null;
  }

  if (component === 'typography') {
    headers.shift();
    tableData.shift();
  }

  if (component === 'logo') {
    headers.shift();
  }

  const formatProp = (datum: TableDataInterface) => {
    if (datum.prop.value === '...') {
      return datum.prop.value;
    }

    return (
      <PropDefinition
        prop={datum.prop.value ?? ''}
        type={datum.type.value ?? ''}
        description={datum.description.value ?? ''}
        defaultValue={datum.default?.value ?? ''}
      />
    );
  };

  const formatDefault = (datum: TableDataInterface) => {
    if (datum.default?.value === '-') {
      return '-';
    }

    return <InlineCode>{datum.default?.value}</InlineCode>;
  };

  return (
    <div
      className={css`
        margin-top: 40px;
      `}
    >
      {component === 'typography' && <TypographyPropTable />}

      {headers.map((header: string, index: number) => {
        return (
          <div key={index} className={tableWrapper}>
            <Subtitle className={subtitleBottomMargin} as="h3">
              {`${header.replace(/ /g, '')} Props`}
            </Subtitle>

            {tableData[index] && (
              <Wrapper isTouchDevice={isTouchDevice}>
                <Table
                  className={css`
                    position: relative;
                    z-index: 0;
                  `}
                  key={header}
                  data={tableData[index]}
                  columns={[
                    <TableHeader dataType="string" label="Prop" key="prop" />,
                    <TableHeader dataType="string" label="Type" key="type" />,
                    <TableHeader
                      dataType="string"
                      label="Description"
                      key="description"
                    />,
                    <TableHeader
                      dataType="string"
                      label="Default"
                      key="default"
                    />,
                  ]}
                >
                  {({ datum }) => (
                    <Row key={datum.prop.value}>
                      <Cell className={verticalAlign}>{formatProp(datum)}</Cell>
                      <Cell className={verticalAlign}>
                        {typeof datum.type.value === 'string'
                          ? formatType(datum.type.value, datum.type.url)
                          : null}
                      </Cell>
                      <Cell className={verticalAlign}>
                        {datum.description.value}
                      </Cell>
                      <Cell className={verticalAlign}>
                        {formatDefault(datum)}
                      </Cell>
                    </Row>
                  )}
                </Table>
              </Wrapper>
            )}
          </div>
        );
      })}
    </div>
  );
}

PropTable.displayName = 'PropTable';

export default PropTable;
