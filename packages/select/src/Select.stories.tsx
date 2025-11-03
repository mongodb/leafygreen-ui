import React, { useState } from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

import { Button } from '@leafygreen-ui/button';
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
  title: 'Components/Inputs/Select',
  component: Select,
  decorators: [
    (StoryFn, _ctx) => (
      <LeafyGreenProvider darkMode={_ctx?.args?.darkMode}>
        <StoryFn />
      </LeafyGreenProvider>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'children',
        'value',
        'open',
        'setOpen',
      ],
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
    errorMessage: { control: 'text' },
    allowDeselect: { control: 'boolean' },
    open: {
      control: false,
      description:
        'Controls whether the dropdown menu is open. When provided, the component becomes controlled for open state.',
    },
    setOpen: {
      control: false,
      description:
        'Callback function called when the open state should change. Required when open prop is provided.',
    },
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
    aria-label="hello world"
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

export const ControlledOpenState: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 300px;
      `}
    >
      <div
        className={css`
          display: flex;
          gap: 8px;
          align-items: center;
        `}
      >
        <Button onClick={() => setIsOpen(true)} size="small">
          Open Select
        </Button>
        <Button onClick={() => setIsOpen(false)} size="small">
          Close Select
        </Button>
        <Button onClick={() => setIsOpen(!isOpen)} size="small">
          Toggle Select
        </Button>
        <span>Open: {isOpen ? 'true' : 'false'}</span>
      </div>

      <Select
        label="Controlled Open State"
        description={`Current value: ${value || 'None selected'}`}
        open={isOpen}
        setOpen={setIsOpen}
        value={value}
        onChange={newValue => {
          setValue(newValue);
        }}
        placeholder="Choose an option"
      >
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
        <Option value="cherry">Cherry</Option>
        <Option value="date">Date</Option>
        <OptionGroup label="Exotic Fruits">
          <Option value="dragonfruit">Dragon Fruit</Option>
          <Option value="kiwi">Kiwi</Option>
          <Option value="mango">Mango</Option>
        </OptionGroup>
      </Select>
    </div>
  );
};

ControlledOpenState.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const ControlledOpenStateWithInitialValue: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(true); // Start opened
  const [value, setValue] = useState('banana'); // Start with a selected value

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 300px;
      `}
    >
      <div
        className={css`
          padding: 12px;
          background-color: #f3f4f6;
          border-radius: 6px;
          font-size: 14px;
        `}
      >
        <strong>State:</strong> Open = {isOpen ? 'true' : 'false'}, Value ={' '}
        {value || 'none'}
      </div>

      <div
        className={css`
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        `}
      >
        <Button onClick={() => setIsOpen(!isOpen)} size="small">
          {isOpen ? 'Close' : 'Open'} Select
        </Button>
        <Button
          onClick={() => setValue('')}
          size="small"
          variant="dangerOutline"
        >
          Clear Selection
        </Button>
        <Button
          onClick={() => setValue('mango')}
          size="small"
          variant="primaryOutline"
        >
          Select Mango
        </Button>
      </div>

      <Select
        label="Initially Open with Value"
        description="This Select starts open with 'banana' selected"
        open={isOpen}
        setOpen={setIsOpen}
        value={value}
        onChange={newValue => {
          setValue(newValue);
        }}
        allowDeselect
      >
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
        <Option value="cherry">Cherry</Option>
        <OptionGroup label="Tropical">
          <Option value="mango">Mango</Option>
          <Option value="pineapple">Pineapple</Option>
        </OptionGroup>
      </Select>
    </div>
  );
};

ControlledOpenStateWithInitialValue.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const ControlledOpenStateWithExternalTrigger: StoryFn = () => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleExternalAction = (action: string) => {
    if (action === 'save') {
      setIsSelectOpen(false);
    } else if (action === 'cancel') {
      setIsSelectOpen(false);
      setValue(''); // Reset on cancel
    }
  };

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: 20px;
        min-width: 350px;
        padding: 20px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
      `}
    >
      <h3
        className={css`
          margin: 0 0 8px 0;
          color: #374151;
          font-size: 18px;
        `}
      >
        Settings Panel
      </h3>

      <div
        className={css`
          display: flex;
          gap: 12px;
          align-items: center;
        `}
      >
        <Button
          onClick={() => setIsSelectOpen(true)}
          size="default"
          disabled={isSelectOpen}
        >
          Choose Theme
        </Button>

        {isSelectOpen && (
          <>
            <Button
              onClick={() => handleExternalAction('save')}
              size="small"
              variant="primary"
            >
              Save
            </Button>
            <Button
              onClick={() => handleExternalAction('cancel')}
              size="small"
              variant="dangerOutline"
            >
              Cancel
            </Button>
          </>
        )}
      </div>

      <Select
        label="Theme Selection"
        description="Choose your preferred theme"
        open={isSelectOpen}
        setOpen={setIsSelectOpen}
        value={value}
        onChange={newValue => {
          setValue(newValue);
        }}
        placeholder="Select a theme"
        disabled={!isSelectOpen}
      >
        <Option value="light">Light</Option>
        <Option value="dark">Dark</Option>
        <Option value="auto">Auto (System)</Option>
        <OptionGroup label="Custom Themes">
          <Option value="high-contrast">High Contrast</Option>
          <Option value="colorblind-friendly">Colorblind Friendly</Option>
        </OptionGroup>
      </Select>

      {value && (
        <div
          className={css`
            padding: 8px 12px;
            background-color: #dcfce7;
            border-radius: 4px;
            font-size: 14px;
            color: #166534;
          `}
        >
          Selected theme: <strong>{value}</strong>
        </div>
      )}
    </div>
  );
};

ControlledOpenStateWithExternalTrigger.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};
