import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

import { css, cx } from '@leafygreen-ui/emotion';
import BeakerIcon from '@leafygreen-ui/icon/dist/Beaker';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { RenderMode } from '@leafygreen-ui/popover';

import { Option, OptionGroup, Select, type SelectProps, Size, State } from '.';

const childrenArray = [
  <Option key="long" value="long" description="I know a little lorem ipsum">
    Cras mattis consectetur purus sit amet fermentum. Maecenas sed diam eget
    risus varius blandit sit amet non magna.
  </Option>,
  <OptionGroup key="Common" label="Common">
    <Option value="dog">Dog</Option>
    <Option value="cat">Cat</Option>
  </OptionGroup>,
  <OptionGroup key="Less common" label="Less common">
    <Option value="hamster">Hamster</Option>
    <Option value="parrot">Parrot</Option>
  </OptionGroup>,
  <Option key="iguana" value="iguana">
    Mexican spiny-tailed iguana
  </Option>,
  <Option key="spider" value="spider" description="I'm chill, I swear">
    Spider
  </Option>,
  <Option key="aardvark" value="aardvark" disabled description="Call me Arthur">
    Aardvark
  </Option>,
  <Option
    key="Spider Monkey"
    value="Spider Monkey"
    description="Hold on tight Spider Monkey"
  >
    Spider Monkey
  </Option>,
  <Option
    key="orange"
    value="orange"
    description="Orange you glad I didn't say banana"
  >
    Orange
  </Option>,
  <Option key="Donkey Kong" value="Donkey Kong" description="OH ba na na">
    Donkey Kong
  </Option>,
  <Option
    key="Wee-snaw"
    value="Wee-snaw"
    description="I was just doing my impression of Mystery"
  >
    Wee-snaw
  </Option>,
];

const meta: StoryMetaType<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  decorators: [
    (StoryFn, _ctx) => (
      <LeafyGreenProvider darkMode={_ctx?.args?.darkMode}>
        <div
          className={css`
            height: 100vh;
          `}
        >
          <StoryFn />
        </div>
      </LeafyGreenProvider>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'children', 'value'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        state: Object.values(State),
        size: Object.values(Size),
        disabled: [false, true],
      },
      args: {
        className: css`
          width: 256px;
        `,
      },
      decorator: (Instance, context) => {
        return (
          <LeafyGreenProvider darkMode={context?.args.darkMode}>
            <Instance glyph={context?.args.glyph} />
          </LeafyGreenProvider>
        );
      },
    },
  },
  args: {
    placeholder: 'Select',
    disabled: false,
    allowDeselect: false,
    darkMode: false,
    children: childrenArray,
    renderMode: RenderMode.TopLayer,
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    defaultValue: { control: 'text' },
    readOnly: { control: 'boolean' },
    errorMessage: { control: 'text' },
    allowDeselect: { control: 'boolean' },
    darkMode: storybookArgTypes.darkMode,
  },
};
export default meta;

export const LiveExample: StoryFn<SelectProps> = ({
  className,
  ...args
}: SelectProps) => (
  <Select
    {...args}
    data-test="hello-world"
    className={cx(
      css`
        min-width: 200px;
        max-width: 400px;
      `,
      className,
    )}
    // eslint-disable-next-line no-console
    onChange={v => console.log(v)}
  />
);
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const WithIcons = LiveExample.bind({});
WithIcons.args = {
  children: [
    <OptionGroup key="Common" label="Common">
      <Option glyph={<BeakerIcon />} value="dog">
        Dog
      </Option>
      <Option glyph={<BeakerIcon />} value="cat" description="Bark bark">
        Cat
      </Option>
    </OptionGroup>,
    <OptionGroup key="Less common" label="Less common">
      <Option glyph={<BeakerIcon />} value="hamster">
        Hamster
      </Option>
      <Option glyph={<BeakerIcon />} value="parrot">
        Parrot
      </Option>
    </OptionGroup>,
    <Option glyph={<BeakerIcon />} key="iguana" value="iguana">
      Mexican spiny-tailed iguana
    </Option>,
    <Option
      glyph={<BeakerIcon />}
      key="spider"
      value="spider"
      disabled
      description="I'm chill, I swear"
    >
      Spider
    </Option>,
  ],
};
WithIcons.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const Generated = () => {};

export const InitialLongSelectOpen = {
  render: () => {
    return (
      <Select
        className={cx(
          css`
            min-width: 200px;
            max-width: 400px;
          `,
        )}
        aria-label="hey"
        // eslint-disable-next-line react/no-children-prop
        children={childrenArray}
      />
    );
  },
  play: async ctx => {
    const { findByRole } = within(ctx.canvasElement.parentElement!);
    const trigger = await findByRole('button');
    userEvent.click(trigger);
  },
  decorators: [
    (StoryFn, _ctx) => (
      <div
        className={css`
          height: 100vh;
          padding: 0;
        `}
      >
        <StoryFn />
      </div>
    ),
  ],
};
