import React from 'react';
import Box from '@leafygreen-ui/box';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  as: 'div' | 'span' | 'button';
  href: boolean;
  children: string;
}> = {
  as: {
    type: 'select',
    options: ['div', 'span', 'button'],
    default: 'div',
    label: 'As',
  },
  children: {
    type: 'text',
    default: 'Box component',
    label: 'Children',
  },
  href: {
    type: 'boolean',
    default: false,
    label: 'href',
  },
};

export default function BoxLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ as, children, href }) => {
        if (href) {
          // @ts-expect-error
          return <Box href={href}>{children}</Box>;
        }

        return <Box as={as}>{children}</Box>;
      }}
    </LiveExample>
  );
}
