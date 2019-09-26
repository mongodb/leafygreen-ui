import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { Align, Justify } from '@leafygreen-ui/popover';
import Tooltip, { TriggerEvent, Variant } from '.';

function ControlledTooltip() {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      open={open}
      setOpen={setOpen}
      align={select('Align', Object.values(Align), 'top')}
      justify={select('Justify', Object.values(Justify), 'start')}
      trigger={<button>trigger</button>}
      triggerEvent={select(
        'triggerEvent',
        Object.values(TriggerEvent),
        'hover',
      )}
      variant={select('Variant', Object.values(Variant), 'light')}
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
      trigger={<button>trigger</button>}
      triggerEvent={select(
        'triggerEvent',
        Object.values(TriggerEvent),
        'click',
      )}
      variant={select('Variant', Object.values(Variant), 'dark')}
    >
      I am an uncontrolled Tooltip!
    </Tooltip>
  ))
  .add('Controlled', () => <ControlledTooltip />);
