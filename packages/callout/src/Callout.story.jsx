import React from 'react';
import Code from '@leafygreen-ui/code';
import Callout, { Variant } from '.';

export default {
  title: 'Packages/Callout',
  component: Callout,
  parameters: { 
    controls: { exclude: ['children'] }
  },
  args: {
    variant: Variant.Note,
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy content ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  }
};

const Template = ({ content, ...args }) => (
  <Callout {...args}>{content}</Callout>
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
  content: (
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