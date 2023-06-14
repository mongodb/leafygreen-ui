/* eslint-disable react/jsx-key, react/display-name */
import React from 'react';

import Icon from '@leafygreen-ui/icon';
import { StoryMetaType } from '@leafygreen-ui/lib';

import { Size } from '../SegmentedControl/SegmentedControl.types';
import { SegmentedControlContext } from '../SegmentedControlContext';

import { SegmentedControlOption } from './SegmentedControlOption';

const meta: StoryMetaType<typeof SegmentedControlOption> = {
  title: 'Components/SegmentedControl/SegmentedControlOption',
  component: SegmentedControlOption,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        children: [undefined, 'Option'],
        glyph: [undefined, <Icon glyph="GlobeAmericas" />],
        size: Object.values(Size),
        disabled: [false, true],
      },
      excludeCombinations: [
        {
          children: undefined,
          glyph: undefined,
        },
      ],
      args: {
        value: 'option',
      },
      decorator: (Instance, ctx) => (
        <SegmentedControlContext.Provider
          value={{
            name: '',
            followFocus: false,
            size: ctx?.args.size,
            theme: ctx?.args.darkMode ? 'dark' : 'light',
          }}
        >
          <Instance />
        </SegmentedControlContext.Provider>
      ),
    },
  },
};

export default meta;

export const Generated = () => <></>;
