import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { InternalComboboxOption } from '../ComboboxOption';

import { InternalComboboxGroup } from './ComboboxGroup';

const meta: StoryMetaType<typeof InternalComboboxGroup> = {
  title: 'Components/Combobox/ComboboxGroup',
  component: InternalComboboxGroup,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
      },
      args: {
        label: 'Label',
        children: (
          <>
            <InternalComboboxOption
              value="option"
              displayName="Option"
              isSelected={false}
              isFocused={false}
              setSelected={() => {}}
              index={0}
            />
          </>
        ),
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
