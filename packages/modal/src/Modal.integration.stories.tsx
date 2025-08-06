import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { type StoryObj } from '@storybook/react';

import { Avatar, Format } from '@leafygreen-ui/avatar';
import Badge from '@leafygreen-ui/badge';
import Banner from '@leafygreen-ui/banner';
import Button from '@leafygreen-ui/button';
import Callout from '@leafygreen-ui/callout';
import Checkbox from '@leafygreen-ui/checkbox';
import { Chip } from '@leafygreen-ui/chip';
import { Combobox, ComboboxOption } from '@leafygreen-ui/combobox';
import Copyable from '@leafygreen-ui/copyable';
import { DatePicker } from '@leafygreen-ui/date-picker';
import { css, cx } from '@leafygreen-ui/emotion';
import IconButton from '@leafygreen-ui/icon-button';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import { NumberInput } from '@leafygreen-ui/number-input';
import { PasswordInput } from '@leafygreen-ui/password-input';
import { ProgressBar } from '@leafygreen-ui/progress-bar';
import { RadioBox, RadioBoxGroup } from '@leafygreen-ui/radio-box-group';
import {
  SegmentedControl,
  SegmentedControlOption,
} from '@leafygreen-ui/segmented-control';
import { Option, OptionGroup, Select } from '@leafygreen-ui/select';
import { SplitButton } from '@leafygreen-ui/split-button';
import TextInput from '@leafygreen-ui/text-input';
import Toggle from '@leafygreen-ui/toggle';
import { spacing } from '@leafygreen-ui/tokens';
import Tooltip from '@leafygreen-ui/tooltip';
import { Body, H3 } from '@leafygreen-ui/typography';

import Modal, { ModalSize } from '.';

const SEED = 0;
faker.seed(SEED);

const meta: StoryMetaType<typeof Modal> = {
  title: 'Sections/Modals/Modal/Integration',

  component: Modal,
  parameters: {
    default: 'ScrollableWithOpenDropdowns',
    generate: {
      storyNames: [
        'ScrollableWithOpenDropdowns',
        'LargeModalWithBackgroundComponents',
      ],
      combineArgs: {
        darkMode: [false, true],
        size: Object.values(ModalSize),
      },
      excludeCombinations: [
        {
          size: ModalSize.Large,
        },
      ],
      decorator: (Instance, ctx) => {
        return (
          <div
            style={{
              height: '100vh',
            }}
          >
            <Instance {...(ctx?.args || {})} open />
          </div>
        );
      },
    },
  },
  args: {
    open: true,
    children: 'Modal content',
  },
  argTypes: {
    children: { control: 'none' },
    ...storybookArgTypes,
  },
};

export default meta;

const margin = css`
  margin: 18px;
`;

/**
 * A test component that integrates multiple LG components with the Modal
 */
const IntegrationContainer = () => {
  const [comboboxValue, setComboboxValue] = useState<string | null>('apple');
  const [selectValue, setSelectValue] = useState('cat');
  const [numberValue, setNumberValue] = useState<string | undefined>('42');
  const [unitValue, setUnitValue] = useState('px');
  const [dateValue, setDateValue] = useState<Date | undefined>(new Date());
  const [textValue, setTextValue] = useState('');
  const [segmentedValue, setSegmentedValue] = useState('option1');
  const [passwordValue, setPasswordValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');

  const componentStyles = css`
    max-width: 256px;
  `;

  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(192px, 1fr));
        gap: ${spacing[4]}px;
        flex: 1;
      `}
    >
      <div className={componentStyles}>
        <Tooltip open={true} trigger={<Button>Hover for Tooltip</Button>}>
          This tooltip is always visible in this story
        </Tooltip>
      </div>

      <div className={componentStyles}>
        <SplitButton
          label={`Split Button`}
          open={true}
          menuItems={[
            <MenuItem key="action1" href="#">
              SplitButton Action 1
            </MenuItem>,
            <MenuItem key="action2" href="#">
              SplitButton Action 2
            </MenuItem>,
            <MenuItem key="action3" href="#">
              SplitButton Action 3
            </MenuItem>,
          ]}
        />
      </div>

      <div className={componentStyles}>
        <Combobox
          label={`Combobox`}
          value={comboboxValue}
          onChange={setComboboxValue}
        >
          <ComboboxOption value="apple">Apple</ComboboxOption>
          <ComboboxOption value="banana">Banana</ComboboxOption>
          <ComboboxOption value="orange">Orange</ComboboxOption>
          <ComboboxOption value="grape">Grape</ComboboxOption>
        </Combobox>
      </div>

      <div className={componentStyles}>
        <Select label={`Select`} value={selectValue} onChange={setSelectValue}>
          <OptionGroup label="Pets">
            <Option value="cat">Select Option 1</Option>
            <Option value="dog">Select Option 2</Option>
            <Option value="hamster">Select Option 3</Option>
          </OptionGroup>
        </Select>
      </div>

      <div className={componentStyles}>
        <DatePicker
          label={`Date Picker`}
          value={dateValue}
          onChange={e =>
            setDateValue(e.target.value ? new Date(e.target.value) : undefined)
          }
          initialOpen
        />
      </div>

      <div className={componentStyles}>
        <NumberInput
          label={`Number Input`}
          value={numberValue}
          onChange={e => setNumberValue(e.target.value)}
          unit={unitValue}
          onSelectChange={unit => setUnitValue(unit.value)}
          unitOptions={[
            { displayName: 'px', value: 'px' },
            { displayName: 'em', value: 'em' },
            { displayName: 'rem', value: 'rem' },
          ]}
        />
      </div>

      <div className={componentStyles}>
        <Menu initialOpen trigger={<Button>Menu</Button>}>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </Menu>
      </div>

      <div className={componentStyles}>
        <TextInput
          label={`Text Input`}
          value={textValue}
          onChange={e => setTextValue(e.target.value)}
          placeholder="Enter text here..."
        />
      </div>

      <div className={componentStyles}>
        <PasswordInput
          label="Password Input"
          value={passwordValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPasswordValue(e.target.value)
          }
          placeholder="Enter password..."
        />
      </div>

      <div className={componentStyles}>
        <ProgressBar value={75} label="Progress Bar" />
      </div>

      <div className={componentStyles}>
        <Checkbox
          label="Checkbox"
          checked={checkboxValue}
          onChange={e => setCheckboxValue(e.target.checked)}
        />
      </div>

      <div className={componentStyles}>
        <Toggle
          aria-label="Toggle"
          checked={toggleValue}
          onChange={checked => setToggleValue(checked)}
        />
      </div>

      <div className={componentStyles}>
        <RadioBoxGroup
          name="Radio Box Group"
          value={radioValue}
          onChange={e => setRadioValue(e.target.value)}
        >
          <RadioBox value="option1">Option 1</RadioBox>
          <RadioBox value="option2">Option 2</RadioBox>
        </RadioBoxGroup>
      </div>

      <div className={componentStyles}>
        <Avatar format={Format.Icon} />
      </div>

      <div className={componentStyles}>
        <Badge>Badge</Badge>
      </div>

      <div className={componentStyles}>
        <Chip label="Chip" />
      </div>

      <div className={componentStyles}>
        <Copyable label="Copyable">Copy this text</Copyable>
      </div>

      <div className={componentStyles}>
        <IconButton aria-label="Settings" />
      </div>

      <div
        className={css`
          max-width: unset;
          grid-column: 1/-1;
        `}
      >
        <Banner>This is a Banner component</Banner>
      </div>

      <div
        className={css`
          max-width: unset;
          grid-column: 1/-1;
        `}
      >
        <Callout>This is a Callout component</Callout>
      </div>

      <div
        className={css`
          max-width: unset;
          grid-column: 1/-1;
        `}
      >
        <SegmentedControl
          label={`Segmented Control`}
          value={segmentedValue}
          onChange={setSegmentedValue}
        >
          <SegmentedControlOption value="option1">
            Option 1
          </SegmentedControlOption>
          <SegmentedControlOption value="option2">
            Option 2
          </SegmentedControlOption>
          <SegmentedControlOption value="option3">
            Option 3
          </SegmentedControlOption>
        </SegmentedControl>
      </div>
    </div>
  );
};

export const WithComponents: StoryObj = {
  args: {
    size: 'large',
  },
  render: (args: any) => {
    return (
      <div
        className={css`
          width: 100vw;
          height: 100vh;
        `}
      >
        <Modal {...args}>
          <div
            className={cx(
              css`
                max-height: 80vh;
                overflow-y: auto;
              `,
              margin,
            )}
          >
            <H3>Scrollable Modal with Open Dropdowns</H3>
            {faker.lorem
              .paragraphs(4, '\n')
              .split('\n')
              .map((p, index) => (
                <Body key={index}>{p}</Body>
              ))}
            <Body>
              This modal contains various components with their dropdowns open.
            </Body>

            <IntegrationContainer />

            {faker.lorem
              .paragraphs(6, '\n')
              .split('\n')
              .map((p, index) => (
                <Body key={index}>{p}</Body>
              ))}
          </div>
        </Modal>
      </div>
    );
  },
};

export const WithBackgroundComponents: StoryObj = {
  args: {
    size: 'large',
  },
  render: (args: any) => {
    return (
      <div
        className={css`
          width: 100vw;
          height: 100vh;
          position: relative;
        `}
      >
        <div
          className={css`
            padding: ${spacing[4]}px;
            outline: 1px solid red;
          `}
        >
          <IntegrationContainer />
        </div>

        <Modal {...args}>
          <div
            className={css`
              height: 80vh;
            `}
          >
            <H3>Large Modal</H3>
            <Body>
              This modal covers, and sits above the background components with
              their open dropdowns.
            </Body>
            {faker.lorem
              .paragraphs(16)
              .split('\n')
              .map((p, index) => (
                <Body
                  className={css`
                    margin: 0.5em 0;
                  `}
                  key={index}
                >
                  {p}
                </Body>
              ))}
          </div>
        </Modal>
      </div>
    );
  },
};
