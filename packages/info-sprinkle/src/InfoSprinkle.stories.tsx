import React from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';
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
    align: Align.Bottom,
  },
};

export default meta;

const Template: StoryFn<typeof InfoSprinkle> = props => (
  <InfoSprinkle {...props} />
);

export const Basic = Template.bind({});
export const Generated = () => {};
