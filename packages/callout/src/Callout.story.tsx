import React from 'react';
import { StoryFn } from '@storybook/react';

import Code from '@leafygreen-ui/code';
import {
  storybookArgTypes,
  storybookExcludedControlParams as defaultExclude,
  StoryMetaType,
} from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

import Callout, { Variant } from '.';

const meta: StoryMetaType<typeof Callout> = {
  title: 'Components/Callout',
  component: Callout,
  parameters: {
    default: 'WithLinks',
    controls: {
      exclude: [...defaultExclude],
    },
  },
  args: {
    variant: Variant.Note,
    children:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy children ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    darkMode: false,
  },
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
    },
    children: storybookArgTypes.children,
    darkMode: storybookArgTypes.darkMode,
  },
};
export default meta;

const Template: StoryFn<typeof Callout> = args => <Callout {...args} />;

export const Note = Template.bind({});
Note.args = {
  variant: Variant.Note,
};

export const Tip = Template.bind({});
Tip.args = {
  variant: Variant.Tip,
};

export const Important = Template.bind({});
Important.args = {
  variant: Variant.Important,
};

export const Warning = Template.bind({});
Warning.args = {
  variant: Variant.Warning,
};

export const Example = Template.bind({});
Example.args = {
  variant: Variant.Example,
};

export const WithRichContent: StoryFn<typeof Callout> = ({
  // eslint-disable-next-line react/prop-types
  darkMode,
  ...args
}) => {
  return (
    <Callout {...args} title="Title" darkMode={darkMode}>
      <>
        Shopping items
        <ul>
          <li>Milk</li>
          <li>Bread</li>
          <li>Bananas</li>
        </ul>
        <Code language="js" darkMode={darkMode}>
          console.log(&apos;Hello world&apos;)
        </Code>
      </>
    </Callout>
  );
};

export const WithLinks: StoryFn<typeof Callout> = ({
  // eslint-disable-next-line react/prop-types
  children,
  ...args
}) => {
  return (
    <Callout {...args}>
      {children}
      <Link href="http://localhost:9001">Link component</Link>
      &nbsp;
      <a href="http://localhost:9001">Anchor tag</a>
    </Callout>
  );
};
