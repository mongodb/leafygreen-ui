import React, { useState, useRef } from 'react';
import Popover from './Popover';
import { storiesOf } from '@storybook/react';
import { select, boolean, number, text } from '@storybook/addon-knobs';
import { css, cx } from '@leafygreen-ui/emotion';
import { colors } from '@leafygreen-ui/theme';

const containerStyle = css`
  position: absolute;
`;

const popoverStyle = css`
  border: 1px solid ${colors.gray[5]};
  text-align: center;
  padding: 20px 20px;
  background-color: ${colors.mongodb.white};
`;

const referenceElPositions = {
  centered: css`
    position: relative;
  `,
  top: css`
    top: 0;
  `,
  right: css`
    right: 0;
  `,
  bottom: css`
    bottom: 0;
  `,
  left: css`
    left: 0;
  `,
};

function DefaultExample() {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={() => setActive(!active)}
      className={cx(
        containerStyle,
        referenceElPositions[
          select(
            'Reference Element Position',
            ['center', 'top', 'right', 'bottom', 'left'],
            'center',
          )
        ],
      )}
    >
      {text('Button Content', 'Popover')}
      <Popover
        align={select('Align', ['top', 'right', 'bottom', 'left'], 'top')}
        justify={select('justify', ['start', 'middle', 'end'], 'start')}
        active={active}
        usePortal={boolean('usePortal', true)}
        spacing={number('spacing', 10)}
        adjustOnMutation={boolean('adjustOnMutation', false)}
      >
        <div className={popoverStyle}>Popover content</div>
      </Popover>
    </button>
  );
}

function AdvancedExample() {
  const [active, setActive] = useState(false);
  const refEl = useRef(null);

  return (
    <>
      <button
        ref={refEl}
        onClick={() => setActive(!active)}
        className={cx(
          containerStyle,
          referenceElPositions[
            select(
              'Reference Element Position',
              ['center', 'top', 'right', 'bottom', 'left'],
              'center',
            )
          ],
        )}
      >
        {text('Button Content', 'Popover')}
      </button>
      <Popover
        align={select('Align', ['top', 'right', 'bottom', 'left'], 'top')}
        justify={select('justify', ['start', 'middle', 'end'], 'start')}
        active={active}
        usePortal={boolean('usePortal', true)}
        spacing={number('spacing', 10)}
        adjustOnMutation={boolean('adjustOnMutation', false)}
        refEl={refEl}
      >
        <div className={popoverStyle}>Popover content</div>
      </Popover>
    </>
  );
}

storiesOf('Popover', module)
  .add('Default', () => <DefaultExample />)
  .add('Advanced', () => <AdvancedExample />);
