/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
  StoryType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import Code from '@leafygreen-ui/code';
import Copyable from '@leafygreen-ui/copyable';
import { css, cx } from '@leafygreen-ui/emotion';
import { Option, OptionGroup, Select } from '@leafygreen-ui/select';
import { breakpoints, spacing } from '@leafygreen-ui/tokens';
import { Body, H3, Subtitle } from '@leafygreen-ui/typography';

import Modal, { CloseIconColor, ModalProps, ModalSize } from '.';

const SEED = 0;
faker.seed(SEED);

const margin = css`
  & > * + * {
    margin-top: ${spacing[3]}px;
  }
`;

const meta: StoryMetaType<typeof Modal> = {
  title: 'Components/Modals/Modal',
  component: Modal,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    size: {
      options: Object.values(ModalSize),
      control: 'radio',
    },
    closeIconColor: {
      options: Object.values(CloseIconColor),
      control: 'radio',
    },
  },
  args: {
    open: true,
    className: css`
      z-index: 1;
    `,
    children: (
      <div className={margin}>
        <H3>Base modal</H3>
        <Body>Modal Content goes here.</Body>
      </div>
    ),
  },
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'setOpen',
        'shouldClose',
        'children',
        'open',
      ],
    },
  },
};
export default meta;

export const LiveExample: StoryType<typeof Modal> = args => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(o => !o)}>Open Modal</Button>
      <Modal {...args} open={open} setOpen={setOpen} />
    </div>
  );
};
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};
LiveExample.args = {
  open: undefined,
};

const Template: StoryFn<ModalProps> = (args: ModalProps) => {
  return (
    <div
      className={css`
        height: 100vh;
        min-height: ${breakpoints.Desktop};
      `}
    >
      <Modal {...args} />
    </div>
  );
};

export const Basic = Template.bind({});
export const DarkMode = Template.bind({});
DarkMode.args = {
  darkMode: true,
};

export const Scroll = Template.bind({});
Scroll.args = {
  children: (
    <div
      className={cx(
        css`
          height: 200vh;
        `,
        margin,
      )}
    >
      <Subtitle>Modal Content goes here.</Subtitle>
      {faker.lorem
        .paragraphs(24, '\n')
        .split('\n')
        .map(p => (
          <Body>{p}</Body>
        ))}
    </div>
  ),
};

export const DefaultSelect = (args: ModalProps) => {
  const [value, setValue] = useState('cat');

  return (
    <div
      className={css`
        height: 100vh;
        min-height: ${breakpoints.Desktop};
      `}
    >
      <Modal {...args}>
        <div className={margin}>
          <Subtitle>Modal Content goes here.</Subtitle>
          {faker.lorem
            .paragraphs(2, '\n')
            .split('\n')
            .map(p => (
              <Body>{p}</Body>
            ))}

          <div>
            <Select
              label="label"
              size="small"
              placeholder="animals"
              name="pets"
              value={value}
              onChange={setValue}
              usePortal={true}
            >
              <OptionGroup label="Common">
                <Option value="dog">Dog</Option>
                <Option value="cat">Cat</Option>
                <Option value="axolotl">Axolotl</Option>
              </OptionGroup>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export function CopyableModal(args: ModalProps) {
  const jsSnippet = `

const myVar = 42;

var myObj = {
  someProp: ['arr', 'ay'],
  regex: /([A-Z])w+/
}

export default class myClass {
  constructor(){
    // access properties
    this.myProp = false
  }
}

function greeting(entity) {
  return \`Hello, \${entity}! Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper.\`;
}
 
console.log(greeting('World'));

`;

  return (
    <div
      className={css`
        height: 100vh;
        min-height: ${breakpoints.Desktop};
      `}
    >
      <Modal {...args}>
        <div className={margin}>
          <div>Modal Content goes here.</div>
          <Copyable>Hello world in a modal</Copyable>

          <Code copyable={true} language="javascript">
            {jsSnippet}
          </Code>
        </div>
      </Modal>
    </div>
  );
}
