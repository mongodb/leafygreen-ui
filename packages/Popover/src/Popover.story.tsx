import React, { Component } from 'react';
import Popover from './Popover';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs'
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';

const { css } = emotion;

const containerStyle = css`
  position: relative;
`;
const popoverStyle = css`
  border: 1px solid ${colors.gray[5]};
  text-align: center;
  padding: 20px 20px;
  background-color: ${colors.mongodb.white};
`;

type Alignment = 'top' | 'bottom' | 'left' | 'right'
type Justify = 'start' | 'middle' | 'end'

class Testing extends Component {
  state = { active: false };
  popoverTest = React.createRef<HTMLButtonElement>();

  render() {
    const align: Alignment = select('Align', ['top', 'bottom', 'left', 'right'], 'bottom')
    const justify: Justify = select('justify', ['start', 'middle', 'end'], 'start')

    return (
      <div className={containerStyle}>
        <button
          ref={this.popoverTest}
          onClick={() => this.setState({ active: !this.state.active })}
        >
          Popover
        </button>

        <Popover
          align={align}
          justify={justify}
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
