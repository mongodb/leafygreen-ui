import React from 'react';
import Code from '@leafygreen-ui/code';
import Callout, { Variant } from '.';
import { ComponentStory, Meta, Story } from '@storybook/react';
import { CalloutProps } from './Callout';
import defaultArgTypes from '../../../stories/defaultArgTypes';

export default {
  title: 'Packages/Callout',
  component: Callout,
  args: {
    variant: Variant.Note,
    children: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy children ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
    },
    children: defaultArgTypes.children,
  },
} as Meta<typeof Callout>;

const Template: ComponentStory<typeof Callout> = (args) => (
  <Callout {...args} />
)

export const Note = Template.bind({})
Note.args = {
  variant: Variant.Note,
};

export const Tip = Template.bind({})
Tip.args = {
  variant: Variant.Tip,
};

export const Important = Template.bind({})
Important.args = {
  variant: Variant.Important,
};

export const Warning = Template.bind({})
Warning.args = {
  variant: Variant.Warning,
};

export const Example = Template.bind({})
Example.args = {
  variant: Variant.Example,
};

export const WithRichContent = Template.bind({})
WithRichContent.args = {
  title: 'Title',
  children: (
    <>
      Shopping items
      <ul>
        <li>Milk</li>
        <li>Bread</li>
        <li>Bananas</li>
      </ul>
      <Code language="js">console.log('Hello world')</Code>
    </>
  )
}