<<<<<<< HEAD
import React, { useState, useRef } from 'react';
import Popover from './Popover';
import { storiesOf } from '@storybook/react';
import { select, boolean, number, text } from '@storybook/addon-knobs';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';

const { css, cx } = emotion;

const containerStyle = css`
  position: absolute;
=======
import React, { Component } from 'react';
import Popover from './Popover.tsx';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';

const { css } = emotion;

const containerStyle = css`
  position: relative;
>>>>>>> groundwork
`;

const popoverStyle = css`
  border: 1px solid ${colors.gray[5]};
  text-align: center;
  padding: 20px 20px;
  background-color: ${colors.mongodb.white};
`;

<<<<<<< HEAD
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
=======
class Testing extends Component {
  state = { active: false };
  popoverTest = React.createRef();

  render() {
    return (
      <div className={containerStyle}>
        <button
          ref={this.popoverTest}
          onClick={() => this.setState({ active: !this.state.active })}
        >
          Popover
        </button>

        <Popover
          align={select('Align', ['top', 'bottom', 'left', 'right'], 'bottom')}
          justify={select('justify', ['start', 'middle', 'end'], 'start')}
          refEl={this.popoverTest}
          active={this.state.active}
          withoutPortal={boolean('Without Portal', false)}
        >
          <div className={popoverStyle}>Popover content</div>
        </Popover>
      </div>
    );
  }
}

storiesOf('Popover', module).add('Default', () => <Testing />);
>>>>>>> groundwork
