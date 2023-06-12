/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types*/
import React from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';

import { HeaderCell } from '../../Cell';
import { HeaderRow } from '../../Row';
import Table from '../../Table/Table';
import TableHead from '../../TableHead';
import { makeData } from '../../utils/makeData.testutils';

const meta: StoryMetaType<typeof HeaderRow> = {
  title: 'Components/Table/Row/HeaderRow',
  component: HeaderRow,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        disabled: [false, true],
      },
      args: {
        children: makeData(false, 1).map(rowData =>
          Object.keys(rowData).map(c => <HeaderCell>{c}</HeaderCell>),
        ),
      },
      decorator: (Instance, ctx) => {
        return (
          <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
            <Table>
              <TableHead>
                <Instance />
              </TableHead>
            </Table>
          </LeafyGreenProvider>
        );
      },
    },
  },
};

export default meta;

export const Generated = () => <></>;
