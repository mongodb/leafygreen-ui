import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import Code from '@leafygreen-ui/code';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Link } from '@leafygreen-ui/typography';

import Callout, { CalloutProps, Variant } from '.';

const loremWithLinks = (
  <div>
    Lorem ipsum dolor sit amet, <Link href="./">Link component</Link>{' '}
    consectetur adipiscing elit. Integer laoreet non metus ac egestas. Integer
    rhoncus, urna in cursus elementum, quam massa vestibulum massa, id pretium
    metus tortor in dolor.
  </div>
);

const meta: StoryMetaType<typeof Callout> = {
  title: 'Components/Callout',
  component: Callout,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        title: [undefined, 'Test Title'],
        darkMode: [false, true],
        variant: Object.values(Variant),
        baseFontSize: Object.values(BaseFontSize),
      },
    },
  },
  args: {
    variant: Variant.Note,
    children: loremWithLinks,
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
    variant: {
      options: Object.values(Variant),
      control: { type: 'select' },
      defaultValue: Variant.Note,
    },
  },
};
export default meta;

export const LiveExample: StoryFn<CalloutProps> = args => <Callout {...args} />;
LiveExample.args = {
  children: loremWithLinks,
};
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const WithRichContent: StoryFn<CalloutProps> = ({
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
        <Code language="js">console.log(&apos;Hello world&apos;)</Code>
      </>
    </Callout>
  );
};

export const Generated = () => {};
