import React from 'react';
import Box from '@leafygreen-ui/box';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';

const knobsConfig: KnobsConfigInterface<{
  as: string;
  href: string | undefined;
  children: string;
}> = {
  as: {
    type: 'select',
    options: ['div', 'span', 'button'],
    default: 'div',
    label: 'As',
  },
  href: {
    type: 'select',
    options: ['mongodb.design', undefined],
    default: undefined,
    label: 'href',
  },
  children: {
    type: 'text',
    default: 'Box component',
    label: 'Children',
  },
};

const BoxLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ as, href, children }) => (
        // @ts-ignore
        <Box as={as} href={href}>
          {children}
        </Box>
      )}
    </LiveExample>
  );
};

export default BoxLiveExample;
