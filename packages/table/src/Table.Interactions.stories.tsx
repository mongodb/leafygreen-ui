import React, { Fragment, useState } from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import { Badge } from '@leafygreen-ui/badge';
import { css } from '@leafygreen-ui/emotion';
import { Icon } from '@leafygreen-ui/icon';
import { IconButton } from '@leafygreen-ui/icon-button';

import { getTestUtils } from './testing/getTestUtils';
import { makeKitchenSinkData, Person } from './utils/makeData.testutils';
import { DynamicDataComponent } from './utils/stories.testutils';
import {
  Cell,
  ExpandedContent,
  flexRender,
  getLgIds,
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
  title: 'Composition/Data Display/Table/Interactions',
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

export const StickyHeader = {
  render: (args: StoryTableProps) => <Template {...args} />,
  decorators: [
    (Story: StoryFn) => (
      <div
        data-testid="wrapper-container"
        style={{
          width: '100%',
          height: '400px', // force shorter container to guarantee scroll for snapshots
          overflow: 'auto',
        }}
      >
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const container = await canvas.findByTestId('wrapper-container');

    const lgIds = getLgIds();
    const table = await canvas.findByTestId(lgIds.root);
    const headerRow = await canvas.findByTestId(lgIds.headerRow);

    expect(table).toHaveAttribute('data-is-sticky', 'false');

    container.scrollTo(0, 400);

    await waitFor(async () => {
      expect(table).toHaveAttribute('data-is-sticky', 'true');
      expect(headerRow).toBeVisible();
    });
  },
};

export const DynamicData = {
  render: DynamicDataComponent,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByTestId('lg-table-button');

    const { getRowByIndex } = getTestUtils();
    const cell = getRowByIndex(0)?.getAllCells()[3];

    expect(cell).toHaveTextContent(expect.stringContaining('with 🥬'));

    userEvent.click(button);

    expect(cell).not.toHaveTextContent(expect.stringContaining('with 🥬'));
  },
};
