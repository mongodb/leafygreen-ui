import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';

import { Cell, HeaderCell } from '../Cell';
import { HeaderRow, Row } from '../Row';
import Table from '../Table/Table';
import TableBody from '../TableBody/TableBody';
import { makeData } from '../utils/makeData.testutils';
import { AnyDict } from '../utils/types';

import TableHead from './TableHead';

export default {
  title: 'Components/Table/TableHead',
  component: TableHead,
  argTypes: {
    children: { control: 'none' },
    ref: { control: 'none' },
    className: { control: 'none' },
    isSticky: { control: 'boolean' },
  },
  // This is needed as a workaround to make arg spreading performant
  // https://github.com/storybookjs/storybook/issues/11657
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    docs: {
      source: { type: 'code' },
    },
  },
} as Meta<typeof Table>;

const Template: ComponentStory<typeof TableHead> = args => {
  const data = makeData(false, 100);
  const columns = Object.keys(data[0]);
  return (
    <Table
      className={css`
        height: 500px;
      `}
    >
      <TableHead {...args}>
        <HeaderRow>
          {columns.map((columnName: string) => (
            <HeaderCell key={columnName}>{columnName}</HeaderCell>
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
  );
};

export const StickyHeader = Template.bind({});
StickyHeader.args = {
  isSticky: true,
};
