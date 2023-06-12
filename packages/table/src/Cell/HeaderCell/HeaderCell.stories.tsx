/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types*/
import React from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';

import InternalRowBase from '../../Row/InternalRowBase';
import Table from '../../Table';
import TableHead from '../../TableHead';

import HeaderCell from './HeaderCell';
// import { SortState } from './HeaderCell.types';

const meta: StoryMetaType<typeof HeaderCell> = {
  title: 'Components/Table/Cell/HeaderCell',
  component: HeaderCell,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        // FIXME: @spark33 none of these props are working in isolation
        // depth: [0, 1],
        // align: ['left', 'center', 'right'],
        // sortState: Object.values(SortState),
      },
      args: {
        cellIndex: 0,
        children: 'Cell content',
      },
      decorator: (Instance, ctx) => {
        return (
          <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
            <Table>
              <TableHead>
                <InternalRowBase>
                  <Instance />
                </InternalRowBase>
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
