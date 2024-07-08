import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { Align, InfoSprinkle, Justify } from '.';

const meta: StoryMetaType<typeof InfoSprinkle> = {
  title: 'Components/InfoSprinkle',
  component: InfoSprinkle,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'onClose', 'shouldClose'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: [BaseFontSize.Body1, BaseFontSize.Body2],
      },
      args: {
        children: "I'm LeafyGreen, you're LeafyGreen",
        open: true,
      },
      decorator: Instance => (
        <div
          className={css`
            width: 256px;
            height: 100px;
            display: flex;
            align-items: center;
          `}
        >
          <Instance />
        </div>
      ),
    },
  },
  args: {
    children: "I'm LeafyGreen",
    baseFontSize: BaseFontSize.Body1,
    darkMode: false,
    justify: Justify.Start,
    align: Align.Top,
  },
  argTypes: {
    open: { control: 'boolean' },
    darkMode: storybookArgTypes.darkMode,
    children: storybookArgTypes.children,
    baseFontSize: {
      control: 'radio',
      options: Object.values(BaseFontSize),
    },
    justify: {
      control: 'select',
      options: Object.values(Justify),
    },
    align: {
      control: 'select',
      options: Object.values(Align),
    },
  },
};

export default meta;

export const LiveExample: StoryFn<typeof InfoSprinkle> = props => (
  <InfoSprinkle {...props} />
);
LiveExample.argTypes = {
  open: {
    control: 'none',
  },
};

export const Generated = () => {};
