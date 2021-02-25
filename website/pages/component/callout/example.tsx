import React from 'react';
import Callout, { Variant } from '@leafygreen-ui/callout';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  variant: Variant;
  children: string;
  title: boolean;
  baseFontSize: 14 | 16;
}> = {
  variant: {
    type: 'select',
    default: Variant.Note,
    options: Object.values(Variant),
    label: 'Variant',
  },
  children: {
    type: 'area',
    default:
      'If you are running your mongod instance with the default host (localhost) and port (27017), you can leave those parameters out when running mongo shell.',
    label: 'Children',
  },
  title: {
    type: 'boolean',
    default: false,
    label: 'Title',
  },
  baseFontSize: {
    type: 'select',
    default: 14,
    label: 'Base Font Size',
    options: [14, 16],
  },
};

export default function CalloutLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ title, ...rest }) => (
        <Callout {...rest} title={title ? 'This is a title' : undefined} />
      )}
    </LiveExample>
  );
}
