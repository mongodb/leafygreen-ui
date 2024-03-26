/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */
import React from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';

import Icon from '@leafygreen-ui/icon/';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import SelectContext from '../SelectContext';

import { InternalOption } from './Option';

const meta: StoryMetaType<typeof InternalOption> = {
  title: 'Components/Select/Option',
  component: InternalOption,
  parameters: {
    default: null,
    generate: {
      storyNames: ['WithIcon', 'WithoutIcon'],
      combineArgs: {
        darkMode: [false, true],
        selected: [false, true],
        disabled: [false, true],
        description: [undefined, "I'm a description"],
      },
      args: {
        children: 'Option',
      },
      decorator: (Instance, ctx) => (
        <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
          <SelectContext.Provider
            value={{
              size: ctx?.args.size,
              disabled: ctx?.args.disabled,
              open: true,
            }}
          >
            <Instance />
          </SelectContext.Provider>
        </LeafyGreenProvider>
      ),
    },
  },
};

export default meta;

export const WithIcon: StoryType<any> = () => <></>;
WithIcon.parameters = {
  generate: {
    args: {
      hasGlyphs: true,
      glyph: <Icon glyph="Cloud" />,
    },
  },
};
export const WithoutIcon: StoryType<any> = () => <></>;
WithoutIcon.parameters = {
  generate: {
    args: {
      hasGlyphs: false,
      glyph: undefined,
    },
  },
};
