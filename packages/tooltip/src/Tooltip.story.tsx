import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import Tooltip, { TriggerEvent, Align, Justify } from '.';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

function ControlledTooltip() {
  const [open, setOpen] = useState(true);

  return (
    <Tooltip
      open={open}
      setOpen={setOpen}
      align={select('Align', Object.values(Align), 'top')}
      justify={select('Justify', Object.values(Justify), 'start')}
      trigger={<Button>trigger</Button>}
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
      usePortal={boolean('Use Portal', false)}
    >
      I am an uncontrolled Tooltip!
    </Tooltip>
  ))
  .add('Controlled', () => <ControlledTooltip />)
  .add('Test', () => {
    const darkMode = boolean('darkMode', false);
    const open = boolean('Open', false);

    return (
      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(4, 64px);
          grid-template-rows: repeat(4, 64px);
          width: 100%;
          gap: 64px;
          align-items: center;
          justify-items: center;
          justify-content: center;
          padding: 96px;
          background-color: ${darkMode ? palette.black : palette.white};
        `}
      >
        {Object.values(Align).map(a =>
          Object.values(Justify).map(j => (
            <Tooltip
              key={a + j}
              open={open || undefined}
              darkMode={darkMode}
              align={a}
              justify={j}
              triggerEvent="click"
              usePortal={boolean('Use Portal', false)}
              trigger={
                <Button leftGlyph={<Icon glyph="InfoWithCircle" />}>
                  Trigger
                </Button>
              }
            >
              Align {a}, Justify {j}
            </Tooltip>
          )),
        )}
      </div>
    );
  });
