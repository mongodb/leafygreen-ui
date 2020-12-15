import React from 'react';
import Copyable from '@leafygreen-ui/copyable';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  label: string;
  description: string;
  children: string;
  darkMode: boolean;
  size: 'default' | 'large';
}> = {
  label: {
    type: 'text',
    default: 'Label',
    label: 'Label',
  },
  description: {
    type: 'text',
    default: 'Description',
    label: 'Description',
  },
  children: {
    type: 'text',
    default: 'npm install @leafygreen-ui/copyable',
    label: 'Children',
  },
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  size: {
    type: 'select',
    options: ['default', 'large'],
    default: 'default',
    label: 'Size',
  },
};

export default function CopyableLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => (
        <div>
          <Copyable {...props} />
        </div>
      )}
    </LiveExample>
  );
}
