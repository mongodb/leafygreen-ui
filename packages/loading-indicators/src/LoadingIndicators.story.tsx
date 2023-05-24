import React from 'react';
import { ComponentStory } from '@storybook/react';

import BlobLoader from './BlobLoader';
import { Spinner } from '.';

export default {
  title: 'Components/LoadingIndicators',
};

const Template: ComponentStory<typeof Spinner> = (props: {
  description?: string;
}) => (
  <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
    <Spinner variant="horizontal" description={props.description} />
    <Spinner variant="default" description={props.description} />
    <Spinner variant="large" description={props.description} />
    <Spinner variant="xlarge" description={props.description} />
    <BlobLoader description={props.description} />
  </div>
);

export const LiveExample = Template.bind({});
LiveExample.args = {
  description: 'Loading...',
};
