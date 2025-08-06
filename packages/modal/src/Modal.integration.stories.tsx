import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { type StoryObj } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { Combobox, ComboboxOption } from '@leafygreen-ui/combobox';
import { DatePicker } from '@leafygreen-ui/date-picker';
import { css, cx } from '@leafygreen-ui/emotion';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import { NumberInput } from '@leafygreen-ui/number-input';
import {
  SegmentedControl,
  SegmentedControlOption,
} from '@leafygreen-ui/segmented-control';
import { Option, OptionGroup, Select } from '@leafygreen-ui/select';
import { SplitButton } from '@leafygreen-ui/split-button';
import TextInput from '@leafygreen-ui/text-input';
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

  const rowStyles = css`
    display: flex;
    flex-direction: row;
    gap: ${spacing[4]}px;
  `;

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: ${spacing[4]}px;
        flex: 1;
      `}
    >
      <div className={rowStyles}>
        <Tooltip open={true} trigger={<Button>Hover for Tooltip</Button>}>
          This tooltip is always visible in this story
        </Tooltip>
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

      <div className={rowStyles}>
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
        <Select label={`Select`} value={selectValue} onChange={setSelectValue}>
          <OptionGroup label="Pets">
            <Option value="cat">Select Option 1</Option>
            <Option value="dog">Select Option 2</Option>
            <Option value="hamster">Select Option 3</Option>
          </OptionGroup>
        </Select>
      </div>

      <div className={rowStyles}>
        <DatePicker
          label={`Date Picker`}
          value={dateValue}
          onChange={e =>
            setDateValue(e.target.value ? new Date(e.target.value) : undefined)
          }
          initialOpen
        />
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

      <div className={rowStyles}>
        <Menu initialOpen trigger={<Button>Menu</Button>}>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </Menu>

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

      <div>
        <TextInput
          label={`Text Input`}
          value={textValue}
          onChange={e => setTextValue(e.target.value)}
          placeholder="Enter text here..."
        />
      </div>
    </div>
  );
};

export const WithOpenPopovers: StoryObj = {
  render: (args: any) => {
    return (
      <div
        className={css`
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
          height: 100vh;
          position: relative;
        `}
      >
        {/* Background components with open dropdowns */}
        <div
          className={css`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: ${spacing[4]}px;
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
