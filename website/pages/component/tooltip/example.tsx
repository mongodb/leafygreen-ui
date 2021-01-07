import React from 'react';
import { css } from 'emotion';
import Button from '@leafygreen-ui/button';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import Tooltip, { Align, Justify, TriggerEvent } from '@leafygreen-ui/tooltip';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  align: Align;
  justify: Justify;
  triggerEvent: typeof TriggerEvent[keyof typeof TriggerEvent];
  enabled: boolean;
  darkMode: boolean;
  usePortal: boolean;
  glyph?: string;
}> = {
  align: {
    type: 'select',
    options: Object.values(Align),
    default: Align.Top,
    label: 'Align',
  },
  justify: {
    type: 'select',
    options: Object.values(Justify),
    default: Justify.Start,
    label: 'Justify',
  },
  triggerEvent: {
    type: 'select',
    options: Object.values(TriggerEvent),
    default: TriggerEvent.Hover,
    label: 'Trigger Event',
  },
  enabled: {
    type: 'boolean',
    default: true,
    label: 'Enabled',
  },
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  usePortal: {
    type: 'boolean',
    default: false,
    label: 'Use Portal',
  },
  glyph: {
    type: 'select',
    options: Object.keys(glyphs),
    default: 'Edit',
    label: 'Glyph',
  },
};

export default function TooltipLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ glyph, ...props }) => {
        if (glyph) {
          <Tooltip {...props} glyph={<Icon glyph={glyph} />}>
            Your clusters and data lakes.
          </Tooltip>;
        }

        return (
          <Tooltip
            {...props}
            trigger={
              <Button
                variant="dark"
                className={css`
                  position: relative;
                `}
              >
                Linked Data Sources
              </Button>
            }
          >
            Your clusters and data lakes.
          </Tooltip>
        );
      }}
    </LiveExample>
  );
}
