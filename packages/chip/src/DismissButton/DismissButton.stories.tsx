import React from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';

import { Variant } from '../Chip/Chip.types';

import { DismissButton } from '.';

const meta: StoryMetaType<typeof DismissButton> = {
  title: 'Components/Chip/DismissButton',
  component: DismissButton,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        label: ['Chip'],
        disabled: [false, true],
        variant: [
          Variant.Gray,
          Variant.Green,
          Variant.Red,
          Variant.Purple,
          Variant.Yellow,
          Variant.Blue,
        ],
      },
      excludeCombinations: [
        {
          disabled: [true],
          variant: [
            Variant.Gray,
            Variant.Green,
            Variant.Red,
            Variant.Purple,
            Variant.Yellow,
          ],
        },
      ],
      args: {
        onDismiss: () => {},
      },
      decorator: (Instance, context) => {
        return (
          <LeafyGreenProvider darkMode={context?.args.darkMode}>
            <Instance />
          </LeafyGreenProvider>
        );
      },
    },
  },
};
export default meta;

export const Generated = () => <></>;
