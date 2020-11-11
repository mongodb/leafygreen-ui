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
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
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
