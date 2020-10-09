import React from 'react';
import { css } from 'emotion';
import PropDefinition from 'components/prop-definition/PropDefinition';
import { Table, TableHeader, Row, Cell } from '@leafygreen-ui/table';
import { Subtitle } from '@leafygreen-ui/typography/dist';

function PropTable({ tableData, component }) {
  return (
    <div
      className={css`
        margin-top: 100px;
      `}
    >
      {component && (
        <Subtitle
          className={css`
            margin-bottom: 16px;
          `}
        >
          {component}
        </Subtitle>
      )}
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
          <TableHeader dataType="string" label="Default" key="deafult" />,
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
    </div>
  );
}

PropTable.displayName = 'PropTable';

export default PropTable;
