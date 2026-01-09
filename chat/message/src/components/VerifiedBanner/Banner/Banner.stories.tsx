import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { Banner } from './Banner';

const meta: StoryMetaType<typeof Banner> = {
  title: 'Composition/Chat/Message/Banner',
  component: Banner,
  args: {
    children: 'This is a message banner',
  },
  argTypes: {},
  parameters: {
    default: null,
  },
};
export default meta;

const Template: StoryFn<typeof Banner> = props => <Banner {...props} />;

export const Basic = Template.bind({});

export const Info = Template.bind({});
Info.args = {
  variant: 'info',
  children: <>This is an info message</>,
};

export const Warning = Template.bind({});
Warning.args = {
  variant: 'warning',
  children: <>This is a warning message</>,
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
  children: <>This is a danger message</>,
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  children: <>This is a success message</>,
};

export const LongText = Template.bind({});
LongText.args = {
  variant: 'success',
  children: (
    <>
      {"This is a success message. It's really quite long."}
      <br />
      {
        "We should make it so long that it wraps around to several new lines, just to see how that looks. So let's keep going and going and going and going and going and going and that's enough."
      }
    </>
  ),
};
