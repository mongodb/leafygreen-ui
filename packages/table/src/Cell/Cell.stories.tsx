/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import InternalRowBase from '../Row/InternalRowBase';
import Table from '../Table';
import TableBody from '../TableBody';

import InternalCell from './InternalCellBase';

const meta: StoryMetaType<typeof InternalCell> = {
  title: 'Components/Table/Cell',
  component: InternalCell,
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
