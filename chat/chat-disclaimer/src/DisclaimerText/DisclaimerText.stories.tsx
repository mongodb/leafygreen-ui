import React from 'react';
import { StoryFn } from '@storybook/react';

import { Link } from '@leafygreen-ui/typography';

import { DisclaimerText } from '.';

export default {
  title: 'Chat/Disclaimer/DisclaimerText',
  component: DisclaimerText,
  args: {
    title: 'Terms and Conditions',
    children: (
      <>
        This is a description block of text. It can be very long, and have{' '}
        <Link>links</Link> inside too. This is a component that demonstrates
        this functionality, but it does not provide the correct legal copy for
        your direct usage. Please consult our design guidelines and your
        team&apos; legal representative for directions on what legal disclaimer
        to render on your chat window.
      </>
    ),
  },
};

const Template: StoryFn<typeof DisclaimerText> = props => (
  <DisclaimerText {...props} />
);

export const Basic = Template.bind({});
