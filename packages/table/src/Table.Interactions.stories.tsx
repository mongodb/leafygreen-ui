import React, { Fragment, useState } from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';
import { expect, waitFor, within } from '@storybook/test';

import Badge from '@leafygreen-ui/badge';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';

import { makeKitchenSinkData, Person } from './utils/makeData.testutils';
import {
  Cell,
  ExpandedContent,
  flexRender,
  HeaderCell,
  type HeaderGroup,
  HeaderRow,
  type LeafyGreenTableRow,
  type LGColumnDef,
  Row,
  Table,
  TableBody,
  TableHead,
  TableProps,
  useLeafyGreenTable,
} from '.';

const meta: StoryMetaType<typeof Table> = {
  title: 'Components/Table/Interactions',
  component: Table,
  parameters: {
    default: 'Template',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'table',
        'children',
        'value',
        'onSelectChange',
        'tableContainerClassName',
        'baseFontSize',
      ],
    },
    // This is needed as a workaround to make arg spreading performant
    // https://github.com/storybookjs/storybook/issues/11657
    docs: {
      source: { type: 'code' },
    },
  },
};
export default meta;

type StoryTableProps = TableProps<any>;

const Template: StoryFn<StoryTableProps> = args => {
  const [data] = useState(() => makeKitchenSinkData(50));

  const columns = React.useMemo<Array<LGColumnDef<Person>>>(
    () => [
      {
        accessorKey: 'dateCreated',
        header: 'Date Created',
        enableSorting: true,
        cell: info =>
          (info.getValue() as Date).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
      },
      {
        accessorKey: 'frequency',
        header: 'Frequency',
      },
      {
        accessorKey: 'clusterType',
        header: 'Cluster Type',
      },
      {
        accessorKey: 'encryptorEnabled',
        header: 'Encryptor',

        cell: info => (
          <Badge variant={info.getValue() ? 'green' : 'red'}>
            {info.getValue() ? 'Enabled' : 'Not enabled'}
          </Badge>
        ),
      },
      {
        accessorKey: 'mdbVersion',
        header: 'MongoDB Version',
        enableSorting: true,
        size: 90,
      },
      {
        id: 'actions',
        header: '',
        size: 90,

        cell: _ => {
          return (
            <>
              <IconButton aria-label="Download">
                <Icon glyph="Download" />
              </IconButton>
              <IconButton aria-label="Export">
                <Icon glyph="Export" />
              </IconButton>
              <IconButton aria-label="More Options">
                <Icon glyph="Ellipsis" />
              </IconButton>
            </>
          );
        },
      },
    ],
    [],
  );

  const table = useLeafyGreenTable<any>({
    data,
    columns,
  });

  const { rows } = table.getRowModel();

  return (
    <div>
      <Table
        table={table}
        className={css`
          width: 1100px;
        `}
        data-testid="lg-table"
        {...args}
      >
        <TableHead isSticky>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<Person>) => (
            <HeaderRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <HeaderCell key={header.id} header={header}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </HeaderCell>
                );
              })}
            </HeaderRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row: LeafyGreenTableRow<Person>) => {
            const isExpandedContent = row.isExpandedContent ?? false;

            return (
              <Fragment key={row.id}>
                {!isExpandedContent && (
                  <Row row={row}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <Cell key={cell.id} id={cell.id} cell={cell}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Cell>
                      );
                    })}
                  </Row>
                )}
                {isExpandedContent && <ExpandedContent row={row} />}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

// TODO: fix this test https://jira.mongodb.org/browse/LG-4867
export const StickyHeader = {
  render: (args: StoryTableProps) => <Template {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = await canvas.findByTestId('lg-table');

    window.scrollTo(0, 500);

    await waitFor(async () => {
      expect(table).toHaveAttribute('data-is-sticky', 'true');
    });
  },
};
