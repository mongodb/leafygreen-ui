/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types*/
import React from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';

import InternalRowBase from '../Row/InternalRowBase';
import Table from '../Table';
import TableBody from '../TableBody';

import InternalCell from './InternalCell';

const meta: StoryMetaType<typeof InternalCell> = {
  title: 'Components/Table/Cell',
  component: InternalCell,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        depth: [0, 1],
        align: ['left', 'center', 'right'],
      },
      args: {
        cellIndex: 0,
        children: 'Cell content',
      },
      decorator: (Instance, ctx) => {
        return (
          <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
            <Table>
              <TableBody>
                <InternalRowBase>
                  <Instance />
                </InternalRowBase>
              </TableBody>
            </Table>
          </LeafyGreenProvider>
        );
      },
    },
  },
};

export default meta;

export const Generated = () => <></>;
