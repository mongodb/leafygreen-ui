/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import InternalRowBase from '../../Row/InternalRowBase';
import Table from '../../Table';
import TableHead from '../../TableHead';

import HeaderCell from './HeaderCell';

const meta: StoryMetaType<typeof HeaderCell> = {
  title: 'Components/Table/Cell/HeaderCell',
  component: HeaderCell,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        align: ['left', 'center', 'right'],
      },
      args: {
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
