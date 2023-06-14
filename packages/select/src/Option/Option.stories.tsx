/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */
import React from 'react';

import Icon from '@leafygreen-ui/icon/';
import { StoryMetaType, StoryType, Theme } from '@leafygreen-ui/lib';

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
      },
      args: {
        children: 'Option',
      },
      decorator: (Instance, ctx) => (
        <SelectContext.Provider
          value={{
            theme: ctx?.args.darkMode ? Theme.Dark : Theme.Light,
            size: ctx?.args.size,
            disabled: ctx?.args.disabled,
            open: true,
          }}
        >
          <Instance />
        </SelectContext.Provider>
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
