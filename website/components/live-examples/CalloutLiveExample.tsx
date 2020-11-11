import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import Callout, { Variant } from '@leafygreen-ui/callout';

const knobsConfig: KnobsConfigInterface<{
  variant: Variant;
  children: string;
  title: boolean;
}> = {
  variant: {
    type: 'select',
    default: Variant.Note,
    options: Object.values(Variant),
    label: 'Variant',
  },
  children: {
    type: 'text',
    default:
      'If you are running your mongod instance with the default host (localhost) and port (27017), you can leave those parameters out when running mongo shell.',
    label: 'Children',
  },
  title: {
    type: 'boolean',
    default: false,
    label: 'Title',
  },
} as const;

export default function CalloutLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ title, ...rest }) => (
        <Callout {...rest} title={title ? 'This is a title' : undefined} />
      )}
    </LiveExample>
  );
}
