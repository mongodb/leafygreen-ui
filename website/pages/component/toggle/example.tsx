import React from 'react';
import { css } from 'emotion';
import { Label } from '@leafygreen-ui/typography';
import Toggle, { Size } from '@leafygreen-ui/toggle';
import { uiColors } from '@leafygreen-ui/palette';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  darkMode: boolean;
  size: Size;
  disabled: boolean;
}> = {
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  size: {
    type: 'select',
    options: Object.values(Size),
    default: Size.Default,
    label: 'Size',
  },
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled',
  },
};

export default function ToggleLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => (
        <>
          <Label
            id="label"
            htmlFor="toggle"
            className={
              props.darkMode
                ? css`
                    color: ${uiColors.gray.light3};
                  `
                : undefined
            }
          >
            This is an accessible label for the Toggle
          </Label>
          <Toggle id="toggle" aria-labelledby="label" {...props} />
        </>
      )}
    </LiveExample>
  );
}
