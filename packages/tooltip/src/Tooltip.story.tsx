import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import Tooltip, { TriggerEvent, Align, Justify } from '.';
import Button from '@leafygreen-ui/button';

function ControlledTooltip() {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      open={open}
      setOpen={setOpen}
      align={select('Align', Object.values(Align), 'top')}
      justify={select('Justify', Object.values(Justify), 'start')}
      trigger={<Button>Trigger</Button>}
      usePortal={boolean('Use Portal', true)}
      enabled={boolean('Enabled', true)}
      triggerEvent={select(
        'triggerEvent',
        Object.values(TriggerEvent),
        TriggerEvent.Click,
      )}
      darkMode={boolean('darkMode', false)}
    >
      I am a controlled Tooltip!
    </Tooltip>
  );
}

storiesOf('Tooltip', module)
  .add('Uncontrolled', () => (
    <Tooltip
      align={select('Align', Object.values(Align), 'top')}
      justify={select('justify', Object.values(Justify), 'start')}
      trigger={<Button>trigger</Button>}
      triggerEvent={select(
        'triggerEvent',
        Object.values(TriggerEvent),
        TriggerEvent.Hover,
      )}
      enabled={boolean('Enabled', true)}
      darkMode={boolean('darkMode', false)}
      usePortal={boolean('Enabled', false)}
    >
      I am an uncontrolled Tooltip!
    </Tooltip>
  ))
  .add('Controlled', () => <ControlledTooltip />);
