import React from 'react';
import { css } from 'emotion';
import { Table, TableHeader, Row, Cell } from '@leafygreen-ui/table';
import { Subtitle, InlineCode } from '@leafygreen-ui/typography/dist';
import PropDefinition from 'components/PropDefinition';
import TypographyPropTable from 'components/TypographyPropTable';
import { margin } from 'styles/spacing';

const tableBottomMargin = css`
  margin-bottom: 56px;
`;

/**
 * Syntactic units in unist syntax trees are called nodes.
 * Interface dervied from Unified types
 */
export interface Node {
  /**
   * The variant of a node.
   */
  type: string;

  /**
   * Information from the ecosystem.
   */
  data?: {
    [key: string]: unknown;
  };

  /**
   * Location of a node in a source document.
   * Must not be present if a node is generated.
   */
  position?: Position;

  children?: Array<any>;

  [key: string]: unknown;
}

const map = {
  [0]: 'prop',
  [1]: 'type',
  [2]: 'description',
  [3]: 'default',
} as const;

interface TableDataInterface {
  prop: string;
  type: string;
  description: string;
  default: string;
}

function getTableData(rows: Array<any>): Array<TableDataInterface> {
  if (!rows) {
    return null;
  }

  const rowMap = rows.map(row => {
    const rowObj: Partial<TableDataInterface> = {};
    row.children.map((cell, index) => {
      const value =
        cell.children
          .map(child => {
            if (child.children) {
              return child.children.map(child => child.value).join('');
            }

            return child.value;
          })
          .join('') || '-';

      rowObj[map[index]] = value;
    });
    return rowObj;
  });

  rowMap.shift();

  return rowMap as Array<TableDataInterface>;
}

function PropTable({ mdAst, component }: { mdAst: Node; component: string }) {
  let peerDepIndex: number | undefined;

  const headers = mdAst?.children
    .filter(treeItem => treeItem.type === 'heading' && treeItem.depth === 1)
    .map(item => item?.children?.[0].value);

  const tableData: Array<Array<TableDataInterface>> = mdAst?.children
    .filter((treeItem, index) => {
      if (treeItem.children?.[0].value === 'Peer Dependencies') {
        peerDepIndex = index;
      }

      return peerDepIndex + 1 !== index && treeItem.type === 'table';
    })
    .map(item => getTableData(item.children));

  if (component === 'typography') {
    headers.shift();
    tableData.shift();
  }

  return (
    <div
      className={css`
        margin-top: 100px;
      `}
    >
      {component === 'typography' && <TypographyPropTable />}
      {headers.map((header: string, index: number) => {
        return (
          <div key={index}>
            <Subtitle className={margin.b4}>{header} Props</Subtitle>

            {tableData[index] && (
              <Table
                className={tableBottomMargin}
                key={header}
                data={tableData[index]}
                columns={[
                  <TableHeader
                    className={css`
                      width: 10%;
                    `}
                    dataType="string"
                    label="Prop"
                    key="prop"
                  />,
                  <TableHeader
                    className={css`
                      width: 30%;
                    `}
                    dataType="string"
                    label="Type"
                    key="type"
                  />,
                  <TableHeader
                    className={css`
                      width: 50%;
                    `}
                    dataType="string"
                    label="Description"
                    key="description"
                  />,
                  <TableHeader
                    className={css`
                      width: 10%;
                    `}
                    dataType="string"
                    label="Default"
                    key="deafult"
                  />,
                ]}
              >
                {({ datum }) => (
                  <Row key={datum.prop}>
                    <Cell>
                      <PropDefinition
                        prop={datum.prop}
                        type={datum.type}
                        description={datum.description}
                        defaultValue={datum.default}
                      />
                    </Cell>
                    <Cell>
                      <InlineCode>{datum.type}</InlineCode>
                    </Cell>
                    <Cell>{datum.description}</Cell>
                    <Cell>
                      {datum.default === '-' ? (
                        '-'
                      ) : (
                        <InlineCode>{datum.default}</InlineCode>
                      )}
                    </Cell>
                  </Row>
                )}
              </Table>
            )}
          </div>
        );
      })}
    </div>
  );
}

PropTable.displayName = 'PropTable';

export default PropTable;
