import React from 'react';
import Box, { BoxProps } from './Box';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';

const knobsConfig: KnobsConfigInterface<BoxProps<'div'>> = {
  as: {
    type: 'select',
    options: ['div', 'button', 'span'],
    default: 'div',
    label: 'As',
  },
  children: {
    type: 'text',
    default: 'This is a box component',
    label: 'Children',
  },
};

const BoxLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Box {...props} />}
    </LiveExample>
  );
};

export { BoxLiveExample}
