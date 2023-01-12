import { ComponentStory, Meta } from '@storybook/react';
import React from 'react';
import { makeData } from '../utils/makeData';
import Table from '../Table/Table';
import TableHead from './TableHead';
import HeaderRow from '../HeaderRow/HeaderRow';
import HeaderCell from '../HeaderCell/HeaderCell';
import TableContainer from '../TableContainer/TableContainer';
import TableBody from '../TableBody/TableBody';
import Row from '../Row/Row';
import Cell from '../Cell/Cell';

export default {
  title: 'Components/Table/TableHead',
  component: TableHead,
  argTypes: {
    children: { control: 'none' },
    ref: { control: 'none' },
  },
} as Meta<typeof Table>;

const Template: ComponentStory<typeof TableHead> = args => {
  const data = makeData(false, 100);
  const columns = Object.keys(data[0]);
  return (
    <TableContainer>
      <Table>
        <TableHead {...args}>
          <HeaderRow>
            {columns.map((columnName: string) => (
              <HeaderCell key={columnName}>{columnName}</HeaderCell>
            ))}
          </HeaderRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <Row>
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


export const StickyHeader = Template.bind({});
StickyHeader.args = {
  isSticky: true,
};