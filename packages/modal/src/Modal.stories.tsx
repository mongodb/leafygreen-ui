/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Button } from '@leafygreen-ui/button';
import { Code, Panel } from '@leafygreen-ui/code';
import { Copyable } from '@leafygreen-ui/copyable';
import { css } from '@leafygreen-ui/emotion';
import { Option, OptionGroup, RenderMode, Select } from '@leafygreen-ui/select';
import { ToastProvider, useToast } from '@leafygreen-ui/toast';
import { spacing } from '@leafygreen-ui/tokens';
import { Body, H3, Subtitle } from '@leafygreen-ui/typography';

import Modal, { CloseIconColor, ModalProps, ModalSize } from '.';

const SEED = 0;
faker.seed(SEED);

const MODAL_MIN_HEIGHT = 1000;

const pageStyles = css`
  height: 100vh;
  min-height: ${MODAL_MIN_HEIGHT}px;
`;

const childrenContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[300]}px;
`;

const meta: StoryMetaType<typeof Modal> = {
  title: 'Sections/Modals/Modal',
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
    children: (
      <div className={childrenContainerStyles}>
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
        // 'open',
      ],
    },
  },
};
export default meta;

const Template: StoryFn<ModalProps> = (props: ModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={pageStyles}>
      <Button onClick={() => setOpen(o => !o)}>Open Modal</Button>
      <Modal {...props} open={open} setOpen={setOpen} />
    </div>
  );
};

export const LiveExample: StoryObj<ModalProps> = {
  render: Template,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const LightMode: StoryObj<ModalProps> = {
  render: Template,
  args: {
    darkMode: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', {
      name: 'Open Modal',
    });
    await userEvent.click(button);

    const title = canvas.getByText('Base modal');
    expect(title).toBeInTheDocument();
  },
  parameters: {
    chromatic: {
      delay: 100,
    },
  },
};

export const DarkMode: StoryObj<ModalProps> = {
  render: Template,
  args: {
    darkMode: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', {
      name: 'Open Modal',
    });
    await userEvent.click(button);

    const title = canvas.getByText('Base modal');
    expect(title).toBeInTheDocument();
  },
  parameters: {
    chromatic: {
      delay: 100,
    },
  },
};

export const Scroll: StoryObj<ModalProps> = {
  render: Template,
  args: {
    className: css`
      height: 500px;
    `,
    children: (
      <div
        className={css`
          height: 200vh;
          ${childrenContainerStyles}
        `}
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', {
      name: 'Open Modal',
    });
    await userEvent.click(button);

    const title = canvas.getByText('Base modal');
    expect(title).toBeInTheDocument();
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

type ModalWithRenderModeProps = ModalProps & {
  renderMode?: RenderMode;
};
const WithSelectComponent: StoryFn<ModalProps> = ({
  renderMode = RenderMode.TopLayer,
  ...props
}: ModalWithRenderModeProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('cat');

  return (
    <div className={pageStyles}>
      <Button onClick={() => setOpen(o => !o)}>Open Modal</Button>
      <Modal {...props} open={open} setOpen={setOpen}>
        <div className={childrenContainerStyles}>
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
              renderMode={renderMode}
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
export const WithTopLayerSelect: StoryObj<ModalProps> = {
  render: WithSelectComponent,
  args: {
    renderMode: RenderMode.TopLayer,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', {
      name: 'Open Modal',
    });
    await userEvent.click(button);
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
export const WithPortalSelect: StoryObj<ModalProps> = {
  render: WithSelectComponent,
  args: {
    renderMode: RenderMode.Portal,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', {
      name: 'Open Modal',
    });
    await userEvent.click(button);
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
export const WithInlineSelect: StoryObj<ModalProps> = {
  render: WithSelectComponent,
  args: {
    renderMode: RenderMode.Inline,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', {
      name: 'Open Modal',
    });
    await userEvent.click(button);
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

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
const getWithCopyChildren = () => (
  <div className={childrenContainerStyles}>
    <div>Modal Content goes here.</div>
    {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
    <Copyable autoFocus>Hello world in a modal</Copyable>
    <Code language="javascript" panel={<Panel onCopy={() => {}} />}>
      {jsSnippet}
    </Code>
  </div>
);
export const WithCopy: StoryObj<ModalProps> = {
  render: Template,
  args: {
    children: getWithCopyChildren(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', {
      name: 'Open Modal',
    });
    await userEvent.click(button);
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

const ToastContainer = () => {
  const { pushToast } = useToast();

  const createToast = () => {
    pushToast({
      title: 'Toast',
      description: 'Toast description',
      variant: 'success',
    });
  };

  return <Button onClick={createToast}>Create Toast</Button>;
};

const getWithToastChildren = () => (
  <ToastProvider>
    <ToastContainer />
  </ToastProvider>
);
export const WithToast: StoryObj<ModalProps> = {
  render: Template,
  args: {
    children: getWithToastChildren(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', {
      name: 'Open Modal',
    });
    await userEvent.click(button);
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
