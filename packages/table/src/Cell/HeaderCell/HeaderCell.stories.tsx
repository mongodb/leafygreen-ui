import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import Cell from '../../Cell/Cell';
import HeaderRow from '../../HeaderRow/HeaderRow';
import Row from '../../Row';
import Table from '../../Table/Table';
import TableBody from '../../TableBody/TableBody';
import TableContainer from '../../TableContainer/TableContainer';
import TableHead from '../../TableHead/TableHead';
import { makeData } from '../../utils/makeData';
import { AnyDict } from '../../utils/types';

import HeaderCell from './HeaderCell';

export default {
  title: 'Components/Table/HeaderCell',
  component: HeaderCell,
  argTypes: {
    align: {
      options: ['left', 'right', 'center'],
      control: { type: 'select' },
    },
    children: { control: 'none' },
  },
} as Meta<typeof Table>;

const Template: ComponentStory<typeof HeaderCell> = args => {
  const data: Array<AnyDict> = makeData(false, 100);
  const columns = Object.keys(data[0]);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <HeaderRow>
            {columns.map((columnName: string) => (
              <HeaderCell key={columnName} {...args}>
                {columnName}
              </HeaderCell>
            ))}
          </HeaderRow>
        </TableHead>
        <TableBody>
          {data.map((row: AnyDict) => (
            <Row key={row.id}>
              {Object.keys(row).map((cellKey: string, index: number) => {
                return <Cell key={`${cellKey}-${index}`}>{row[cellKey]}</Cell>;
              })}
            </Row>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const RightAlignedHeader = Template.bind({});
RightAlignedHeader.args = {
  align: 'right',
};
