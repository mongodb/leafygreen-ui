/* eslint-disable react/display-name, react/jsx-key */
import React from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';

import Icon from '@leafygreen-ui/icon';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { ComboboxContext, defaultContext } from '../ComboboxContext';

import { InternalComboboxOption } from './ComboboxOption';

const meta: StoryMetaType<typeof InternalComboboxOption> = {
  title: 'Components/Combobox/ComboboxOption',
  component: InternalComboboxOption,
  parameters: {
    default: null,
    generate: {
      storyNames: ['WithIcons', 'WithoutIcons', 'WithoutIconsAndMultiStep'],
      combineArgs: {
        darkMode: [false, true],
        description: [undefined, 'This is a description'],
        isSelected: [false, true],
        isFocused: [false, true],
        disabled: [false, true],
      },
      decorator: (Instance, context) => {
        return (
          <LeafyGreenProvider darkMode={context?.args.darkMode}>
            <ComboboxContext.Provider
              value={{ ...defaultContext, withIcons: context?.args.withIcons }}
            >
              <Instance glyph={context?.args.glyph} />
            </ComboboxContext.Provider>
          </LeafyGreenProvider>
        );
      },
    },
  },
  args: {
    displayName: 'Option',
    setSelected: () => {},
  },
};

export default meta;

export const WithoutIcons: StoryType<typeof InternalComboboxOption> = () => (
  <></>
);
WithoutIcons.parameters = {
  generate: {
    args: {
      /// @ts-expect-error - withIcons is not a component prop
      withIcons: false,
      glyph: undefined,
    },
  },
};

export const WithIcons: StoryType<typeof InternalComboboxOption> = () => <></>;
WithIcons.parameters = {
  generate: {
    args: {
      /// @ts-expect-error - withIcons is not a component prop
      withIcons: true,
      glyph: <Icon glyph="Cloud" />,
    },
  },
};

export const WithoutIconsAndMultiStep: StoryType<
  typeof InternalComboboxOption
> = () => <></>;
WithoutIconsAndMultiStep.parameters = {
  generate: {
    decorator: (Instance, context) => {
      return (
        <LeafyGreenProvider darkMode={context?.args.darkMode}>
          <ComboboxContext.Provider
            value={{
              ...defaultContext,
              withIcons: context?.args.withIcons,
              multiselect: true,
            }}
          >
            <Instance glyph={context?.args.glyph} />
          </ComboboxContext.Provider>
        </LeafyGreenProvider>
      );
    },
    args: {
      /// @ts-expect-error - withIcons is not a component prop
      withIcons: false,
      glyph: undefined,
    },
  },
};
