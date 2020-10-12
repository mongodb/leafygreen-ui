import React from 'react';
import { css } from 'emotion';
import PropDefinition from 'components/PropDefinition';
import { Table, TableHeader, Row, Cell } from '@leafygreen-ui/table';
import { Subtitle } from '@leafygreen-ui/typography/dist';

const map = {
  [0]: 'prop',
  [1]: 'type',
  [2]: 'description',
  [3]: 'default',
};

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
    const rowObj = {};
    row.children.map((cell, index) => {
      const value = cell.children?.map(child => child.value).join('') || '-';
      rowObj[map[index]] = value;
    });
    return rowObj;
  });

  rowMap.shift();

  return rowMap;
}

function PropTable({ mdAst }) {
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

  return (
    <div
      className={css`
        margin-top: 100px;
      `}
    >
      {headers.map((header, index) => {
        return (
          <>
            {headers.length > 1 && (
              <Subtitle
                className={css`
                  margin-bottom: 24px;
                `}
              >
                {header}
              </Subtitle>
            )}
            {tableData[index] && (
              <Table
                className={css`
                  margin-bottom: 56px;
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
                    <Cell>{datum.type}</Cell>
                    <Cell>{datum.description}</Cell>
                    <Cell>{datum.default}</Cell>
                  </Row>
                )}
              </Table>
            )}
          </>
        );
      })}
    </div>
  );
}

PropTable.displayName = 'PropTable';

export default PropTable;
