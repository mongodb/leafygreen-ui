import React from 'react';
import { css } from 'emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { RadioBoxGroup, RadioBox, Size } from '@leafygreen-ui/radio-box-group';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';

// When interface is used, ts complains that index signature is missing
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Knobs = {
  size: Size;
  disabled: boolean;
  children: string;
};

const knobsConfig: KnobsConfigInterface<Knobs> = {
  size: {
    type: 'select',
    default: Size.Default,
    options: Object.values(Size),
    label: 'Size',
  },
  disabled: {
    type: 'boolean',
    default: true,
    label: 'Disabled',
  },
  children: {
    type: 'text',
    default: 'Option Two',
    label: 'Children',
  },
};

function DefaultExample({ size, disabled, children }: Knobs) {
  return (
    <LeafyGreenProvider>
      <div
        className={css`
          width: 100%;
          padding: 2rem;
        `}
      >
        <RadioBoxGroup size={size} name="radio-box-group-default">
          <RadioBox value="1">Option One</RadioBox>
          <RadioBox value="2">{children}</RadioBox>
          <RadioBox disabled={disabled} value="option-4">
            Disabled Option
          </RadioBox>
        </RadioBoxGroup>
      </div>
    </LeafyGreenProvider>
  );
}

export default function RadioBoxGroupLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <DefaultExample {...props} />}
    </LiveExample>
  );
}
