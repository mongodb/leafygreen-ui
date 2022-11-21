/* eslint-disable */
// TODO: Table Shape is defined as `any` for now since our test data format isn't consistent.
import { css } from '@leafygreen-ui/emotion';
import { storybookArgTypes } from '@leafygreen-ui/lib';
import { ComponentStory, Meta } from '@storybook/react';
import React, { useState } from 'react';
import Cell from '../Cell/Cell';
import HeaderCell from '../HeaderCell/HeaderCell';
import { Align, SortState } from '../HeaderCell/types';
import HeaderRow from '../HeaderRow/HeaderRow';
import Row from '../Row/Row';
import TableHead from '../TableHead/TableHead';
import TableBody from '../TableBody/TableBody';
import Table from './Table';
import { TableProps } from './types';

export default {
  title: 'Components/TableNew',
  component: Table,
  args: {
    withHeaders: false,
  },
  argTypes: {
    children: { control: 'none' },
    darkMode: storybookArgTypes.darkMode,
    ref: { control: 'none' },
  },
} as Meta<typeof Table>;

const testData = Array(10).fill({
  test1: 'Test 1',
  test2: 'Test 2',
  test3: 'Test 3',
});

const Template: ComponentStory<typeof Table> = args => (
  <Table {...args}>
    <TableHead>
      <HeaderRow>
        {Object.keys(testData[0]).map(colHeader => (
          <HeaderCell columnName={colHeader}>{colHeader}</HeaderCell>
        ))}
      </HeaderRow>
    </TableHead>
    <TableBody>
      {testData.map((dataRow, i) => (
        <Row key={i}>
          {Object.keys(dataRow).map((cellKey: string, j: number) => (
            <Cell key={j}>{dataRow[cellKey]}</Cell>
          ))}
        </Row>
      ))}
    </TableBody>
  </Table>
);

export const Basic = Template.bind({});

export const WithZebraStriping = Template.bind({});
WithZebraStriping.args = {
  shouldAlternateRowColor: true,
};

export const AlignmentWorkaround = ({ ...args }: TableProps) => {
  const isLastColumn = (i: number) => i === Object.keys(testData[0]).length - 1;
  return (
    <Table
      className={css`
        table-layout: fixed;
        width: 600px;
      `}
      {...args}
    >
      <TableHead>
        <HeaderRow>
          {Object.keys(testData[0]).map((colHeader, i) => (
            <HeaderCell
              colSpan={isLastColumn(i) ? 4 : 1}
              align={isLastColumn(i) ? 'right' : undefined}
              columnName={colHeader}
            >
              {colHeader}
            </HeaderCell>
          ))}
        </HeaderRow>
      </TableHead>
      <TableBody>
        {testData.map((dataRow, j) => (
          <Row key={j}>
            {Object.keys(dataRow).map((cellKey: string, j: number) => (
              <Cell key={j} colSpan={isLastColumn(j) ? 4 : 1}>
                {cellKey}
              </Cell>
            ))}
          </Row>
        ))}
      </TableBody>
    </Table>
  );
};

export const WithSorting = ({ ...args }: TableProps) => {
  const isLastColumn = (i: number) => i === Object.keys(testData[0]).length - 1;
  const [sortState, setSortState] = useState<SortState>(SortState.Ascending);
  const handleSortIconClick = (newSortState: SortState) => {
    console.log('sort icon clicked', newSortState);
    setSortState(newSortState);
  };
  const columnAligns: Align[] = ['left', 'right', 'right'];

  return (
    <Table
      className={css`
        table-layout: fixed;
        width: 600px;
      `}
      {...args}
    >
      <TableHead>
        <HeaderRow>
          {Object.keys(testData[0]).map((colHeader, i) => (
            <HeaderCell
              sortState={sortState}
              onSortIconClick={handleSortIconClick}
              columnName={colHeader}
              colSpan={isLastColumn(i) ? 4 : 1}
              align={columnAligns[i]}
            >
              {colHeader}
            </HeaderCell>
          ))}
        </HeaderRow>
      </TableHead>
      <TableBody>
        {testData.map((dataRow, j) => (
          <Row key={j}>
            {Object.keys(dataRow).map((cellKey: string, j: number) => (
              <Cell key={j} colSpan={isLastColumn(j) ? 4 : 1}>
                {cellKey}
              </Cell>
            ))}
          </Row>
        ))}
      </TableBody>
    </Table>
  );
};

// Verifying that portal children like Select render correctly in all cases
export const WithPortalChildren = ({ ...args }: TableProps) => {
  return <></>;
};
